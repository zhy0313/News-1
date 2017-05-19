import myConnect
import pymysql
import datetime as dt
conn = pymysql.connect(host='120.77.34.254', port=3306, user='root', passwd='exciting', db='news', charset="utf8")
cursor=conn.cursor()
types=['mli','eco']
for type in types:
    sql="DELETE FROM mli"
    cursor.execute(sql)
conn.commit()
cursor.close()
conn.close()