import requests
from bs4 import BeautifulSoup
from fp.fp import FreeProxy
import json

# establishing session
s = requests.Session() 
user_id = 14168070 #my kp id
s.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36',
        'accept-language':'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control':'max-age=0'

    })
proxy = FreeProxy(rand=True).get()
s.proxies.update({
    "http": proxy
    })

def load_user_data(user_id, page, session):
    url = 'https://www.kinopoisk.ru/user/%d/votes/list/vote/10/vs/vote/ord/kp/#list/%d' % (user_id, page)
    request = session.get(url)
    return request.text

def contain_movies_data(text):
    soup = BeautifulSoup(text, 'lxml')
    soup.prettify()
    film_list = soup.find('div', {'class': 'profileFilmsList'})
    ##saveFilmList(film_list)
    return film_list is not None

''' ##maybe parsing?
def saveFilmList(list):
    data = []
    c=1
    for item in list.findAll('div', {'class': ['item', 'item even']}):
        movie_link = item.find('div', {'class': 'nameRus'}).find('a').get('href')
        movie_desc = item.find('div', {'class': 'nameRus'}).find('a').text
        data[c].name=movie_link
        data[c].link=movie_link
        c+=1
    print(data)
    with open("./data_file.json", "w") as write_file:
        json.dump(data, write_file)
'''

# loading pages
page = 1 #2
while page<=1: #only 1 page пока что
    #time.sleep(1)
    data = load_user_data(user_id, page, s)
    if contain_movies_data(data):
        with open('./page_%d.html' % (page), 'wb') as output_file:
            data=data.encode('utf-8',errors='ignore')
            output_file.write(data)
            page += 1
    else:
            break