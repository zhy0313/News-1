#!/usr/bin/env python
# -*- encoding: utf-8 -*-
# Created on 2017-05-15 18:26:00
# Project: news

from pyspider.libs.base_handler import *
from pyquery import PyQuery as pq
import datetime
import  pymysql
import threading
import time

conn =pymysql.connect(host='localhost', port=8889, user='root', passwd='root', db='news', charset="utf8")
cursor=conn.cursor()

class Handler(BaseHandler):
    crawl_config = {
    }

    @every(minutes=24*60)
    def on_start(self):
       
        self.crawl('http://military.cctv.com/data/index.json', callback=self.index_page)
        self.crawl('http://jingji.cctv.com/data/index.json', callback=self.index_page)
        self.crawl('http://it.sohu.com/', callback=self.index_page_sohu)
        self.crawl('http://learning.sohu.com/', callback=self.index_page_sohu)
        self.crawl('http://sports.sohu.com/', callback=self.index_page_sohu)
        self.crawl('http://www.zju.edu.cn',callback=self.end_page,exetime=time.time()+60)
    
              
    @config(age=0)
    def end_page(self,response):
        conn.commit()
        cursor.close()
        conn.close()
        return{"url":response.url}
    
 
        
    @config(age=0)
    def index_page(self, response):
        myResponse=response.json['rollData']
        for x in myResponse:
            self.crawl(x['url'], callback=self.detail_page)
        #return{'response':response.json['rollData']}
    
    @config(age=0)
    def index_page_sohu(self,response):
        if response.url=='http://sports.sohu.com/':
            for x in pq(response.text)('.news > p > a'):
                url=pq(x).attr('href')
                self.crawl(url, callback=self.detail_page_sohu)
        else:
            for x in pq(response.text)('.news-box-aa > h4,.news-box-pic > h4 ').find('a'):
                url=pq(x).attr('href')[2:]
                self.crawl("http://"+url, callback=self.detail_page_sohu)
    
    @config(age=0) #爬取文章详情页
    def detail_page_sohu(self, response):
        if pq(response.text)('.location > a').text()=='教育':
            myType='edu'
        elif pq(response.text)('.location > a').text()=='科技':
            myType="sci"
        else:
            myType="spo"
        
        if myType=='spo':
            title=response.doc('[itemprop="headline"]').text()
            source=response.doc('.sc > span > span').text()
            myTime=response.doc('[itemprop="datePublished"]').text()[:16]
            myImgs=pq(response.text)("td > img")
            if myImgs:
                imgUrl=myImgs.eq(0).attr("src")
            else:
                imgUrl="www.zju.edu.cn"
                
            content=pq(response.text)('[itemprop="articleBody"] > p').filter(lambda i:len(pq(this).text())>0)
            content_arr=[]
            content.each(lambda i:content_arr.append(pq(this).html()))
            content="</p><p style='text-align:2em;'>".join(content_arr)
            content="<p>"+content+"</p>"
            
       
        else:
            title=response.doc('h1').text()
            source=response.doc('h4 > a').text()
            content=pq(response.text)('p').filter(lambda i:i>0).not_(":contains(原标题)").not_(":contains(文／)")
            content_arr=[]
            content.each(lambda i:content_arr.append(pq(this).html()))
            content="</p><p>".join(content_arr)
            content="<p>"+content+"</p>"
            myImgs=pq(response.text)("p > img")
            if myImgs:
                imgUrl=myImgs.eq(0).attr("src")
                if imgUrl[0:4]!='http':
                    imgUrl='http:'+imgUrl
            else:
                imgUrl="www.zju.edu.cn"
           
        
            myTime=pq(response.text)('#news-time').attr('data-val')
            myTime=datetime.datetime.fromtimestamp((int(myTime))/1000).strftime('%Y-%m-%d %H:%M')
        
        sql="INSERT INTO %s"%myType+"(title,time,author,content,imgUrl) VALUES ('{0}','{1}','{2}','{3}','{4}')".format(title,myTime,source,content,imgUrl)
        cursor.execute(sql)
        
        return  {'url':response.url,
               'title':title,
               'source':source,
               "type":myType,
               "content":content,
               "imgUrl":imgUrl,
                 'time':myTime,
                 "sql":sql
               }
       
    
   
    
    
    @config(age=0)
    def detail_page(self, response):
        content=pq(response.text)('p').not_('.o-tit').filter(lambda i:i>0).not_(":contains(中国中央电视台)").not_(":contains(createPlayer)")
        content_arr=[]
        content.each(lambda i:content_arr.append(pq(this).html()))
        content="</p><p>".join(content_arr)
        
        raw_time=response.doc('.info > i').text()
        if raw_time:
            raw_time=raw_time[raw_time.index("201"):]
        else:
            raw_time=response.doc('.title_dt').text()
        FORMAT='%Y年%m月%d日 %H:%M'
        raw_time=datetime.datetime.strptime(raw_time,FORMAT)
        raw_time=raw_time.strftime('%Y-%m-%d %H:%M')
        
        
        source=response.doc('.info > i > a').text()
        if  source=="":
            source=response.doc('.info > i').text()
            if "来源" in source:
                source=source[source.index('来源')+3:source.index('201')-1]
            else:
                source="央视网军事新闻"
        
        title=response.doc('h1').text()
        if "_军事频道" in title:
            title=title[0:title.index("_军事频道")]
            
        content="<p>"+content+"</p>"
        
        
        myImgs=pq(response.text)("p > img");
        if myImgs:
            imgUrl=myImgs.eq(0).attr("src")
        else:
            imgUrl="www.zju.edu.cn"
                
        myType="mli"
        if "military.cctv.com" in response.url:
            myType="mli"
        elif "jingji.cctv.com" in response.url:
            myType="eco"
              
   
        cursor.execute("INSERT INTO %s"%myType+"(title,time,author,content,imgUrl) VALUES ('{0}','{1}','{2}','{3}','{4}')".format(title,raw_time,source,content,imgUrl))
        
        return {
            "content":content,
            "title":title,
            "url": response.url,
            "time":raw_time,
            "source":source,
            "type":myType,
            "imgUrl":imgUrl
        }
    
        
    

        
