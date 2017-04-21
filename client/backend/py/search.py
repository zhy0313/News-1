import feedparser
import pymysql
import datetime as dt
def search(rss_url,author,type):
    # 获得订阅
    feeds = feedparser.parse(rss_url)
    # 连接数据库
    conn=pymysql.connect(host='120.77.34.254',port=3306,user='root',passwd='exciting',db='news',charset="utf8")
    cursor = conn.cursor()

    for feed in feeds['entries']:
        # print(feed)
        src=feed.link
        newsTime = feed.published
        if author=='新浪新闻':
            src=src[src.index('=http')+1:]
            GMT_FORMAT = '%a, %d %b %Y %H:%M:%S GMT'
            newsTime=dt.datetime.strptime(newsTime,GMT_FORMAT)
        if author=='百度新闻':
            BAI_FORMAT='%Y-%m-%dT%H:%M:%S.000Z'
            newsTime=dt.datetime.strptime(newsTime,BAI_FORMAT)

        title=feed.title
        print(title,src,newsTime,author)
        cursor.execute("INSERT INTO %s"%type+"(title,src,time,author) VALUES ('{0}','{1}','{2}','{3}')".format(title,src,newsTime,author))
    conn.commit()
    cursor.close()
    conn.close()


search("http://rss.sina.com.cn/roll/mil/hot_roll.xml",'新浪新闻','mli')
search("http://news.baidu.com/n?cmd=1&class=mil&tn=rss",'百度新闻','mli')

#search('http://rss.sina.com.cn/tech/rollnews.xml','新浪新闻','sci')
#search('http://rss.sina.com.cn/roll/sports/hot_roll.xml','新浪新闻','spo')


#凤凰 搜狐新闻源太旧 南方周末,澎湃新闻没有,百度和新浪新闻可以