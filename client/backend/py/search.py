import feedparser
import myConnect
import datetime as dt
# import requests
# from bs4 import BeautifulSoup
# def searchContent(url):
#     r=requests.get(url)
#     soup = BeautifulSoup(r.text, 'lxml')  # 声明BeautifulSoup对象
#     print(r.text)
#     find = soup.find(id='wrapOuter')  # 使用find方法查到第一个p标签
#     print(find.string)

def search(rss_url,webSite,type):
    # 获得订阅
    feeds = feedparser.parse(rss_url)
    print(feeds)
    # 连接数据库
    conn=myConnect.myConnect()
    cursor=conn.cursor()

    for feed in feeds['entries']:
        # print(feed)
        src=feed.link

        newsTime = feed.published
        author=webSite
        if webSite=='新浪新闻':
            src=src[src.index('=http')+1:]
            GMT_FORMAT = '%a, %d %b %Y %H:%M:%S GMT'
            newsTime=dt.datetime.strptime(newsTime,GMT_FORMAT)+dt.timedelta(hours=8)
        if webSite=='百度新闻':
            BAI_FORMAT='%Y-%m-%dT%H:%M:%S.000Z'
            newsTime=dt.datetime.strptime(newsTime,BAI_FORMAT)+dt.timedelta(hours=8)
            author = feed.author

        title=feed.title
        print(title,src,newsTime,author)
        cursor.execute("INSERT INTO %s"%type+"(title,src,time,author) VALUES ('{0}','{1}','{2}','{3}')".format(title,src,newsTime,author))
    myConnect.loseConnect(conn,cursor)


types=['ent']
webSites=['新浪新闻','百度新闻']
rss_urls=['http://rss.sina.com.cn/roll/mil/hot_roll.xml','http://news.baidu.com/n?cmd=1&class=mil&tn=rss',
          'http://rss.sina.com.cn/tech/rollnews.xml','http://news.baidu.com/n?cmd=1&class=technnews&tn=rss',
          'http://rss.sina.com.cn/ent/hot_roll.xml','http://news.baidu.com/n?cmd=1&class=enternews&tn=rss',
          'http://rss.sina.com.cn/news/allnews/games.xml','http://news.baidu.com/n?cmd=1&class=gamenews&tn=rss',
          'http://rss.sina.com.cn/edu/focus19.xml','http://news.baidu.com/n?cmd=1&class=edunews&tn=rss']
i=4
for type in types:
    for webSite in webSites:
        search(rss_urls[i],webSite,type)
        i=i+1

#search("http://rss.sina.com.cn/roll/mil/hot_roll.xml",'新浪新闻','mli')
#search("http://news.baidu.com/n?cmd=1&class=mil&tn=rss",'百度新闻','mli')
#search('http://rss.sina.com.cn/tech/rollnews.xml','新浪新闻','sci')
#search('http://news.baidu.com/n?cmd=1&class=technnews&tn=rss','百度新闻','sci')
#search('http://rss.sina.com.cn/roll/sports/hot_roll.xml','新浪新闻','spo')

#凤凰 搜狐新闻源太旧 南方周末,澎湃新闻没有,百度和新浪新闻可以

