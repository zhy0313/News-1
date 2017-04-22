import  pymysql
def myConnect():
    conn = pymysql.connect(host='120.77.34.254', port=3306, user='root', passwd='***', db='news', charset="utf8")
    return conn
def loseConnect(conn,cursor):
    conn.commit()
    cursor.close()
    conn.close()