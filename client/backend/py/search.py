import feedparser
import pymysql
import datetime as dt
import requests
from bs4 import BeautifulSoup
def searchContent(url):
    r=requests.get(url)
    soup = BeautifulSoup(r.text, 'lxml')  # 声明BeautifulSoup对象
    print(r.text)
    find = soup.find(id='wrapOuter')  # 使用find方法查到第一个p标签
    print(find.string)

def search(rss_url,webSite,type):
    # 获得订阅
    feeds = feedparser.parse(rss_url)
    # 连接数据库
    conn=pymysql.connect(host='120.77.34.254',port=3306,user='root',passwd='exciting',db='news',charset="utf8")
    cursor = conn.cursor()

    deadline=dt.timedelta(days=2)
    cursor.execute('DELETE')

    for feed in feeds['entries']:
        # print(feed)
        src=feed.link
        newsTime = feed.published
        author=webSite
        if webSite=='新浪新闻':
            src=src[src.index('=http')+1:]
            searchContent(src)
            GMT_FORMAT = '%a, %d %b %Y %H:%M:%S GMT'
            newsTime=dt.datetime.strptime(newsTime,GMT_FORMAT)+dt.timedelta(hours=8)
        if webSite=='百度新闻':
            BAI_FORMAT='%Y-%m-%dT%H:%M:%S.000Z'
            newsTime=dt.datetime.strptime(newsTime,BAI_FORMAT)+dt.timedelta(hours=8)
            author = feed.author

        title=feed.title
        print(title,src,newsTime,author)
        break
        #cursor.execute("INSERT INTO %s"%type+"(title,src,time,author) VALUES ('{0}','{1}','{2}','{3}')".format(title,src,newsTime,author))
    conn.commit()
    cursor.close()
    conn.close()


#search("http://rss.sina.com.cn/roll/mil/hot_roll.xml",'新浪新闻','mli')
#search("http://news.baidu.com/n?cmd=1&class=mil&tn=rss",'百度新闻','mli')

#search('http://rss.sina.com.cn/tech/rollnews.xml','新浪新闻','sci')
#search('http://rss.sina.com.cn/roll/sports/hot_roll.xml','新浪新闻','spo')


#凤凰 搜狐新闻源太旧 南方周末,澎湃新闻没有,百度和新浪新闻可以