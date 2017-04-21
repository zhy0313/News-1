import feedparser
import pymysql
def search(rss_url,author,type):
    # 获得订阅
    feeds = feedparser.parse(rss_url)
    print(feeds)
    # 连接数据库
    conn=pymysql.connect(host='120.77.34.254',port=3306,user='root',passwd='exciting',db='news',charset="utf8")
    cursor = conn.cursor()
    # cursor.set_character_set('utf8')
    # cursor.execute('SET NAMES utf8;')
    # cursor.execute('SET CHARACTER SET utf8;')
    # cursor.execute('SET character_set_connection=utf8;')

    for feed in feeds['entries']:
        # print(feed)
        time=feed.published
        title=feed.title
        content=feed.description
        print(title,time,author)
        cursor.execute("INSERT INTO %s"%type+"(title,content,time,author) VALUES ('{0}','{1}','{2}','{3}')".format(title,content,time,author))
    conn.commit()
    cursor.close()
    conn.close()



search("http://rss.sina.com.cn/roll/mil/hot_roll.xml",'新浪网','mli')
search('http://rss.sina.com.cn/tech/rollnews.xml','新浪网','eco')



