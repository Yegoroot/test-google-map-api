## О проекте
Тестовое задание для веб студии
- [demo](https://test-map95.firebaseapp.com/)

## Задача
Есть фрагмент задчачи который выбран из проекта (или из другого контекста). И так как это тестовое задания, то детали не значительны, а делаю акцент на способе реализации и подходе. 
Касаемо технической части стало чётко ясно использование API карт и хранение как общего состояния, так и отдельных частей.

## Как можно расширить
На данном этапе мы имеем состояние одного пользователя с возможностью привязки его к локации, а так же возможность настроить систему для вычисления маршрутов и управлением ими как для одного пользователя (пользователя этими инструментами), так и для администратора этих пользователей для управления их маршрутами  

## Что реализованно, настроено
- react-google-maps, redux-saga в утке, connected-react-router, material-ui 
- компонент для вычисления ширины и долготы городов и если мы сохраним их в состояние приложения, то получим возможность динамически добавлять на карту маркеры, а так же маршруты между точками и расстояния между ними и различные другие комбинации и особенно если использовать gps устройства
