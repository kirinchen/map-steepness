# Google Map 單車路徑計算坡度和角度小工具

本人最近開始稍微開始認真騎腳踏車,然後我常用google map 去安排路線(癡迷上自己亂排路線的快感 XD)
但是常常google會帶入非人性化的路線,例如用走的都幾乎走不上去,於似乎本人找了幾個工具
像是

**[bikeroll](https://bikeroll.net/)**

![accept.jpg](https://github.com/kirinchen/note-annex/blob/master/map-gradient/bikeroll-not-enough.png?raw=true)

非常直觀好用,但是坡度顯示不精準 (12% ~ 48%  <--- 48%會往生XD)

所以本人就想說來開發一個能夠自己決定每幾公尺就計算這個區段的坡度的小工具,工具網址如下


 https://mapsteepness.web.app
 ====
 源始碼
 
> Github : https://github.com/kirinchen/map-steepness-gradient

___

# 設定教學

1. 一進入網站就會先到設定頁   https://mapsteepness.web.app/config 
2. 設定基本參數

![accept.jpg](https://github.com/kirinchen/note-annex/blob/master/map-gradient/config.png?raw=true)
- 設定說明
    - A: 設定語系
    - B: 設定每幾公尺為一個路徑
    - C :設定 Google Map 金鑰,請看此 **[教學](https://github.com/kirinchen/map-steepness-gradient/blob/master/doc/gmapkey-zh-tw.md)**

3. Google Map 金鑰要啟用 Directions API / Maps Elevation API / Maps JavaScript API 三個服務

![map-service-enable.jpg](https://github.com/kirinchen/note-annex/blob/master/map-gradient/map-service-enable.png?raw=true)

> 啟用服務教學 : [教學](https://github.com/kirinchen/map-steepness-gradient/blob/master/gmapkey-zh-tw.md)

> 為什麼要此金鑰,因為Google這幾年增加圖資的費用,所以很多地圖相關的APP都取消服務,而我們採用各自申請金鑰來提供此服務,且沒有超過一定的使用量基本上是免費的

# 操作教學

### 1. 準備單車路徑的KML檔案
  - [google map 匯出KML教學](https://github.com/kirinchen/map-steepness-gradient/blob/master/doc/mymap-export-kml.md)
  - 範例檔案 ： [點我下載](https://raw.githubusercontent.com/kirinchen/note-annex/master/map-gradient/Path.kml)
  - KML  [Wiki](https://zh.m.wikipedia.org/zh-tw/KML)

### 2. 匯入KML檔案到 mapsteepness 系統中 : [連結](https://mapsteepness.web.app/load)

![map.jpg](https://github.com/kirinchen/note-annex/blob/master/map-gradient/sel-kml.png?raw=true)
![map.jpg](https://github.com/kirinchen/note-annex/blob/master/map-gradient/sel-kml-done.png?raw=true)



###  3. 等匯入完成 就可以點選 路徑列表

![map.jpg](https://github.com/kirinchen/note-annex/blob/master/map-gradient/import-done.png?raw=true=500x700)
![map.jpg](https://github.com/kirinchen/note-annex/blob/master/map-gradient/path-table.png?raw=true) 

### 4. 查看此次路徑，的每個路徑分段，並選擇要在地圖上觀察的分段

![ptb](https://github.com/kirinchen/note-annex/blob/master/map-gradient/path-table-view.png?raw=true)

- 可以用上面的過濾器 透過夾角或是坡度來篩選 要的路徑
- 起點/終點 : 標示路段起點/終點的經緯度
- 距離 : 該路段的長度
- 海拔 : 終點的海拔高度
- 坡度/夾角 : 該路段的爬升坡度,與夾角
- 選取 : 選區的路段可以顯示在地圖上

### 5. 顯示在地圖上
![mapo](https://github.com/kirinchen/note-annex/blob/master/map-gradient/map-over-all.png?raw=true)
  5.1 點選其中的一段的路徑


點擊地圖標示 起點/終點
![START](https://github.com/kirinchen/note-annex/blob/master/map-gradient/mark-start.png?raw=true) : 起點 
![START](https://github.com/kirinchen/note-annex/blob/master/map-gradient/mark-end.png?raw=true) : 終點

![mapcl](https://github.com/kirinchen/note-annex/blob/master/map-gradient/map-click-mark.png?raw=true)
- 點擊後可以看到 海拔 / 該路段距離/ 坡度 等資訊
- 點擊 Open Gmap : 開啟該點位在google map
![oom](https://github.com/kirinchen/note-annex/blob/master/map-gradient/open-in-gmap.png?raw=true)


# 建置專案

此專案是透過 angular 開發，所以請先準備angular的開發環境[angular官網](https://angular.io/)

1. 
 ```
git clone https://github.com/kirinchen/map-steepness-gradient.git
```
2. 
```
cd map-steepness-gradient.git
```
3.
```
ng serve
```
4. open browser http://localhost:4200


enjoy!
