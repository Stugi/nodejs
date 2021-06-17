// 1. Требуется реализовать декоратор с параметрами pause,
// который откладывает выполнение функции на указанное
// количество секунд. Пример использования:
// function func() {
// 	console.log('Функция выполниться с задержкой в 2 секунды!');
// }

let paused = pause(func, 2);
paused();

function pause(fun, sec){
  return function() {
    console.log(`Функция выполнится с задержкой в ${sec} сек`);
		return setTimeout(()=>fun.apply(),sec*1000);
	}
}
  function func() {
  	console.log('Выполнение ф-ции.......');
  }

// 2*. Требуется реализовать декоратор с параметрами returnObject,
// который в случае, если функция возвращает массив, подменяет
// его объектом. Имена задаются в параметрах декоратора. Декоратор
// универсальный, количество имен переменное.
// Пример использования №1:
function func(){
	return [1, 2]
}
let f = func;
f = returnObject(f, 'ddd','ddddd');
console.log(f());

function returnObject(func,...params){
  let result = func();
  if(!result || !(result instanceof Array) || !params)
    return func;

    return function(){
      let obj = {};
      params.forEach((e,i)=>{
        obj[e]=result[i];
      });
      return obj;
    }
}



// 3 (для итоговой работы): Разработать свою авторскую страницу на
// код ошибки 404. Вот статья на эту тему: https://habrahabr.ru/post/213227/
//
