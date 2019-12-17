const show = async () => {
  const data = await fetchData();
  const root = document.getElementById("root");
  //готовим массив строк для отрисовки таблицы
  const list = data.map(
    elem =>
      `<tr>
            <td>${elem.id}</td>
            <td>${elem.name}</td>
            <td>${elem.group1}</td>
          </tr>`
  );
  //рисуем таблицу
  root.innerHTML = `<table class="table table-striped table-sm"> 
    <thead>
      <tr>
        <th>№</th>
        <th>Ім'я</th>
        <th>Група</th>
      </tr>
    </thead>
    <tbody>
    ${
      list.join("") //объединяем массив в строку
    }
    </tbody>`;
};

const fetchData = async () => { 
  const fetched = await fetch("/api/") //промис, если мы зашли, и все нормас, мы возвращаем данные
    .then(response => { //дата с базы данных (апи)
      if (response.ok) {
        return response.json(); //превращаем в объект (потому что это было строкой)
      }
    })
    .then(data => { 
      return data;
    });
  return fetched;
};

document.getElementById("registerForm").onsubmit = async e => { //получили форму и сделали так, чтоб на онсабмите выполнялась ф-ция
  e.preventDefault(); //не даем перезагрузиться странице
  const { elements } = e.target; //получаем элементы
  const data = {
    name: elements[0].value, //разделяем наши инпуты
    group: elements[1].value
  };
  console.log(data);
  await fetch("/api/", { 
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data) //превращаем его в строку
  }); //отправляем на сервер данные
  Array.prototype.forEach.call(e.target.elements, elem => {
    //делает поля пустыми
    elem.value = "";
  });
  await show();
};
