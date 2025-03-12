from flask import Flask,render_template
import pandas as pd
import datetime 

app=Flask(__name__)

birthday_df=pd.read_excel("data/birthdays.xlsx")
anniversary_df=pd.read_excel("data/anniversaries.xlsx")

def filter_data():
    pass

@app.route("/")
def index_page():
    today_date=datetime.date.today().strftime('%d/%m')    
    return render_template("index.html")

if __name__=="__main__":
    app.run(host="0.0.0.0", debug=True)
