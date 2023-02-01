from selenium import webdriver

from selenium.webdriver.chrome.service import Service

import time

ser_obj = Service("/chromedriver.exe")

driver = webdriver.Chrome(service = ser_obj)

driver.set_window_size(700, 700)

driver.get('https://www.messenger.com/t/100008623775179')

time.sleep(2)

driver.find_elements("email").send_keys("0866517702")
time.sleep(2)
driver.find_element("pass").send_keys("1khong0ba@")
time.sleep(2)
driver.find_element("login").click()
time.sleep(10)

driver.get('https://www.messenger.com/t/100008623775179')

input()

driver.quit()