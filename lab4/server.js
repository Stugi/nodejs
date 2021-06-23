'use strict'
const http = require('http');
const fs = require('fs');
const path = require('path');

let mimeTypes = {
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.mp4': 'video/mp4', //mime тип для файлов формата .mp4,
  '.mp3': 'audio/mpeg'
};

http.createServer((req,res)=>{
  let pathname, extname, mimeType;
  console.log("req: " + req.url);
  console.log("req: " + req.headers.range);
  if (req.url === '/')
    pathname = 'site/index.html';
  else
    pathname = 'site' + req.url;
  extname = path.extname(pathname);
  mimeType = mimeTypes[extname];

  if (extname === '.mp4' || extname === '.mp3') {
    // fs.readFile(pathname, (err, data) => {
    //   if (err) {
    //     console.log('Could not find or open file for reading\n');
    //     res.statusCode = 404;
    //     res.end();
    //   } else {
    //     console.log(`The file ${pathname} is read and sent to the client\n`);
    //     res.writeHead(200, {
    //       'Content-Type':mimeType
    //     });
    //     res.end(data);
    //   }
    // });

    if (!fs.existsSync(pathname)) { //Функция existsSync проверяет существование запрашиваемого файла
      console.log(`Could not find or open file ${pathname} for reading\n`);
      res.statusCode = 404;
      res.end();
      return null;
    }
    //создаем пустой объект для будущего хранения заголовков ответа сервера
    let resHeaders = {};
    //  Функция statSync возвращает описание файла.
    let stat = fs.statSync(pathname);
    //Разбираем содержимое заголовка Range в запросе от браузера
    let rangereq = readRangeHeader(req.headers['range'], stat.size); //stat.size – размер файла
    //Проверяем, а был ли заголовок Range в запросе от браузера
    if (rangereq == null) {
      //Заголовка Range не было в запросе от браузера, а значит сразу полностью возвращаем
      //файл
      //Формируем заголовки ответа
      resHeaders['Content-Type'] = mimeType;
      resHeaders['Content-Length'] = stat.size; //Говорим размер файла
      resHeaders['Accept-Ranges'] = 'bytes'; //Говорим, что можем отдавать диапазонами
      //Читаем и возвращаем файл с кодом 200
      let video = fs.readFileSync(pathname);
      console.log(`The file ${pathname} is read and sent to the client\n`);
      res.writeHead(200, resHeaders);
      res.end(video);
      return null;
    }
  let start = rangereq.start;
  let end = rangereq.end;
  //Проверяем соответствует ли запрашиваемый браузером диапазон размеру файла
  if (start >= stat.size || end >= stat.size) {
    // Запрашиваемый диапазон больше файла возвращаем код 416
    resHeaders['Content-Range'] = 'bytes */' + stat.size; //Размер файла
    console.log("Return the 416 'reqed Range Not Satisfiable'");
    res.writeHead(416, resHeaders);
    res.end();
    return null;
  }
  let maxsize = 10240; /*Максимальный размер частичного контента 10KB (это значение выбрано для
    примера, может быть задано другое из соображений производительности)*/
    //Проверяем превышает ли запрашиваемый браузером диапазон максимальному размеру
    if (end - start >= maxsize){
      //Превышает, поэтому изменяем конечную границу диапазона
      end = start + maxsize - 1;
    }
    //Формируем заголовки ответа с частичным контентом
    resHeaders['Content-Range'] = 'bytes ' + start + '-' + end + '/' + stat.size; /*Отправляемый диапазон с байтами */
    resHeaders['Content-Length'] = start == end ? 0 : (end - start + 1);
    resHeaders['Content-Type'] = mimeType;
    resHeaders['Accept-Ranges'] = 'bytes'; //Говорим, что отдаем диапазон с байтами
    resHeaders['Cache-Control'] = 'no-cache'; //не кешировать результат
    //Считываем дескриптор файла, необходим для чтения части файла
    const fd = fs.openSync(pathname, 'r'); //'r' – режим работы с файлом только чтение
    /*Создаем буфер (специализированный числовой массив) для хранения прочитанных из файлов байтов*/
    let buf = Buffer.alloc(resHeaders['Content-Length']);
    /*Читаем часть файла. Вызываем функцию чтения со следующими аргументами: fd – дискриптор
      файла, buf – буфер куда сохранить почитанные байты, 0 – позиция с которой надо писать в буфер,
      buf.length – количество байтов для прочтения из файла, start – это позция в файле с которой читать байты */
      fs.read(fd, buf, 0, buf.length, start, (err, bytes) => {
        if(err){
          console.log(err);
          res.statusCode = 500; //Отдаём ошибку в ответ клиенту
          res.end();
        } else {
          //Отдаем часть файла и соответствующий статус 206
          res.writeHead(206, resHeaders);
          res.end(buf);
        }
      });
  } else if (extname === ".jpg" || extname === ".gif" || extname === ".ico") {
      try {
        let img = fs.readFileSync(pathname);
        console.log(`The file ${pathname} is read and sent to the client\n`);
        res.writeHead(200, {'Content-Type': mimeType});
        res.end(img);
      } catch (e) {
        console.log('Could not find or open file for reading\n');
        res.statusCode = 404;
        res.end();
      }
    } else {
    fs.readFile(pathname, 'utf8', (err, data) => {
      if (err) {
        console.log(`Could not find or open file ${pathname} for reading\n`);
        res.statusCode = 404;
        res.end();
      } else {
        console.log(`The file ${pathname} is read and sent to the client\n`);
        res.writeHead(200, { 'Content-Type':mimeType
      });
      res.end(data);
    }
  });
}}).listen(8000, ()=>{
        console.log("HTTP server works in 8000 port!\n");
      });


function readRangeHeader(range, totalLength) {
      //range – содержимое заголовка «Range»
      // totalLength – размер запрашиваемого файла
      //проверяем задано ли содержимое заголовка «Range»
      if (range == null || range.length == 0) return null;
      //с помощью регулярного выражения разбиваем строку из заголовка «Range»
      //на массив из четырех значений
      console.log(range);
      let array = range.split(/bytes=([0-9]*)-([0-9]*)/);
      //забираем начальную позицию
      let startRange = parseInt(array[1]);
      //забираем конечную позицию
      let endRange = parseInt(array[2]);
      //формируем результирующий объект с двумя свойствами начало и конец диапозона:
      let result = {
        //если не указан начало диапазона, то присваиваем в качестве его значения 0
        start: isNaN(startRange) ? 0 : startRange,
        //если не указан конец диапазона, то присваиваем в качестве его значение конца
        //запрашиваемого файла
        end: isNaN(endRange) ? (totalLength - 1) : endRange
      };
      //Проверяем случай: начало не указано, а конец указан – значит запрашиваются данные с
      //конца файла
      if (isNaN(startRange) && !isNaN(endRange)) {
        result.start = totalLength - endRange;
        result.end = totalLength - 1;
      }
      return result;
}
