# :rocket: FullCalendar

- 🏡 홈페이지 : [https://fullcalendar.io/](https://fullcalendar.io/)
- 📄 공식 문서 : [https://fullcalendar.io/docs#toc](https://fullcalendar.io/docs#toc)
- 📦 GitHub : [https://github.com/fullcalendar/fullcalendar](https://github.com/fullcalendar/fullcalendar)

## [ 목차 ]

<br>
<br>
<br>

## :white_check_mark: 1. 소개

`FullCalendar`는 **자바스크립트 기반 오픈 소스 캘린더 라이브러리**로, `일정관리` 기능을 구현할 때 많이 사용됩니다.  

현재 아마존, 우버, 넷플릭스, 삼성 등 유명 대기업에서도 해당 서비스를 사용하고 있으며, 현재도 지속적으로 업데이트가 진행되고 있습니다.  

`FullCalendar`에서 **지원하는 내용**은 다음과 같습니다.  

- 일정 관리 기능이 포함된 UI 캘린더 컴포넌트
- Google Calendar 스타일의 월/주/일 보기 지원
- 드래그 앤 드롭 및 다양한 기능 지원
- 외부 데이터(JSON, API) 연동 가능

기본으로 제공하는 오픈 소스(`MIT 라이센스`)뿐만 아니라, `Resource Timeline`이나 `Resource Time Grid`와 같은 유료 서비스도 지원하고 있습니다.  
<br>

## 🛠 2. 설치

[공식 홈페이지](https://fullcalendar.io/docs/getting-started)에서 제공하는 여러 설치 방법을 확인할 수 있습니다.  

이 중에서 저는 직접 파일을 [다운로드](https://fullcalendar.io/docs/initialize-globals)하여 적용하는 방식을 선택했습니다.  

`CDN`으로 설치하고자 할 경우 하단 스크립트 코드를 추가 하시면 됩니다.  

```html
<script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.18/index.global.min.js'></script>
```

`FullCalendar`는 여러 모듈형 [플러그인](https://fullcalendar.io/docs/plugin-index)을 제공하는데, `index.global.js`와 `index.global.min.js`는  

- `@fullcalendar/core`
- `@fullcalendar/interaction`
- `@fullcalendar/daygrid`
- `@fullcalendar/timegrid`
- `@fullcalendar/list`
- `@fullcalendar/multimonth`

가 포함되어 있습니다.
<br>

## ✅ 3. 적용

적용하고자 하는 요소를 선택하여 `new FullCalendar.Calendar()`로 불러오면 됩니다.  

```html
<head>
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.18/index.global.min.js'></script>
</head>
<body>
    <div id="calendar"></div>
    <script>
        const calendarEl = document.getElementById('calendar');
        const calendar = new FullCalendar.Calendar(calendarEl, {
            // 옵션 설정
        })
        calendar.render();
    </script>
</body>
```
<br>

## 4. 옵션 설정

`FullCalendar`는 정말 많은 옵션을 보유하고 있습니다.  

공식 홉페이지의 Docs를 보면 얼추 백가지 정도이기 때문에, 중요 옵션과 현재 프로젝트에서 사용된 옵션 위주로 설명하겠습니다.  

| 옵션 | 설명 |
|:----|:----|
| [initialView]() | 첫 화면 보기 옵션 선택 |



### 1) initialView

`initialView`는 캘린더 첫 화면의 종류를 선택하는 옵션입니다.  

```js
const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView : "dayGridMonth"
})
```

#### 달력 형식

- `dayGridYear`
- `dayGridMonth`
- `dayGridWeek` 
- `dayGridDay`
- `dayGrid`

#### 시간별 형식

- `timeGridWeek`
- `timeGridDay`
- `timeGrid`

#### 리스트 형식

- `listYear`
- `listMonth`
- `listWeek`
- `listDay`
- `list`

설정하지 않을 경우 초기값인 `dayGridMonth`로 설정됩니다.  

현재 프로젝트에선 `dayGridMonth`를 기본값으로 사용하였으며, `dayGridMonth, timeGridWeek, timeGridDay, listWeek`를 툴바에 추가하여 함께 사용하였습니다.

### 2) locale

[언어](https://fullcalendar.io/docs/locale)를 설정하는 옵셥입니다.  

현재 프로젝트에서는 한국어로 사용하기 위해 `ko`로 값을 주었습니다.

```js
const calendar = new FullCalendar.Calendar(calendarEl, {
    locale : "ko"
})
```

### 3) height

캘린더의 높이를 설정할 수 있습니다.  

현재 프로젝트에선 작업이 추가되는 만큼 높이가 늘어나길 원했기 때문에 `auto`로 설정하였습니다.

```js
const calendar = new FullCalendar.Calendar(calendarEl, {
    height : "auto"
})
```