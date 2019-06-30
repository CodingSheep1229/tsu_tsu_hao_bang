# [107-2] Web Programming Final <br> (GROUP 9) Trip Scheduler

### 1. 一句話描述這個服務在做什麼
提供多人線上共同規劃出遊行程

### 2. Deployed 連結
https://tripplanna.herokuapp.com

### 3. 操作說明
i. 安裝
```
git clone https://github.com/CodingSheep1229/tsu_tsu_hao_bang.git
cd tsu_tsu_hao_bang
npm install
cd frontend
npm install
cd ..
```
ii. 執行
在root folder執行
```
npm start
```

### 4. 功能說明
(1) 註冊帳號後即可登入
(2) 登入後會看到各個行程計畫，可以選擇、新增、刪除、修改計畫名稱，並邀請別的使用者來共同規劃行程
(3) 點擊計畫進入後在左邊滑出選單有行程(Schedule)、待辦事項(Todo)和投票(Vote)三個按鈕導到各自的頁面
(4) Schedule: 可以讓使用者輸入行程的時間、行程、花費、備註，並且可以隨時刪除與修改項目
(5) To Do List: 可以讓使用者輸入待辦事項、時限，並且可以隨時刪除與修改項目
(6) Vote: 由於旅行時有些事情會需要大家討論，使用者可建立投票例如某天餐廳的選項，進行投票
(7)登出與註冊：登出帳號及註冊新的帳號，註冊的帳號會提醒是否是已註冊過的email

### 5. 使用Package
前端：
* React
* Redux
* Material UI: table, card, textfield etc.

後端：
* jsonwebtoken(登入驗證)
* passport (登入驗證)
* express(http server)
* mongoose(與mongodb連接)
* nodemon(開發即時更新)


### 6. Demo影片連結

### 7. 分工
B056705001 資管三 黃意芹：
* 頁面設計、美化
* 前端
* demo影片

B05705014 資管三 鄭揚：
* 後端api架設
* 前端後端溝通
* 資料庫架設
* 上線到heroku

B05705039 資管三 李惟慈：
* 前端
* 前端後端溝通
* demo影片

### 8. 心得
黃意芹：
這次的期末專案是因為我們要一起規劃畢旅而發想的，我主要負責前端的部分。寫前端最困難的就是調整CSS的部分以及要理解component之間的傳輸和運作，而這次我在寫component的時候，有發現一個東西叫react hook，他是把class component改成用function的形式來表達，寫法上多有差異，但是整體而言，概念差不多，此外，我覺得美觀的設計真的需要投入很多的心力，在調整的時候真的是蠻崩潰的，此外，token的驗證、localstorage和state的等待時間有差異...一些小小的，但是會極大的影響到整個的運作，都讓我成長不少。

鄭揚：
期中專案時我寫CSS寫到有陰影，因此這次期末專案我基於對CSS的懼怕選擇去做後端。遇到最頭痛的問題就是在上線到heroku時一直遇到Invalid Host Header的問題，最後靠著同學的解惑終於成功上線(感恩翔翔讚嘆翔翔)。在這門課我覺得我對Javascript有了更深入的了解，我以為都以為Javascript只能拿來寫前端，這門課真是讓我大開眼界，體會到js的強大。
最後，看著同組組員跟CSS的奮戰，我確立了我以後絕對不要入行前端工程師XDD。

李惟慈：
這次的期末專案，其實寫了真的很久，因為前端真的是一個很難又很玄妙的東西，在寫的過程當中也搞懂很多之前上課的內容，如有使用到redux、promise、async、await，很基本的一些功能，但是認真研究起來很複雜，而且很瑣碎，把很多東西串在一起，需要了解到他function被trigger的時間、每個東西需要的資料型態，和後端串接也花了很多時間。不過這次做完專案之後，我更清楚react的用法，並且也了解到前端工程師的不易啊。











