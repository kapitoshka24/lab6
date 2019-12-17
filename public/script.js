const show = async() => {
    const data = await fetchData();
    const root = document.getElementById("root");
    const list = data.map(elem => (
        `<tr>
            <td>${elem.id}</td>
            <td>${elem.name}</td>
            <td>${elem.group1}</td>
          </tr>`
        ));
    root.innerHTML = `<table class="table table-striped table-sm">
    <thead>
      <tr>
        <th>id</th>
        <th>Name</th>
        <th>Group</th>
      </tr>
    </thead>
    <tbody>
    ${list.join('')}
    </tbody>` 

}

const fetchData= async() => 
{
const data = await fetch('/api/').then(response => {
        if(response.ok) {
            return response.json()
        }
    }).then(data => {
        return data;
    })
    return data;
}

document.getElementById('registerForm').onsubmit = async (e) => {
    e.preventDefault();
    const {elements} = e.target;
    const data = {
        name: elements[0].value,
        group: elements[1].value
    }
    console.log(data);
    await fetch('/api/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    console.log(e.target);
    console.log(elements);
    Array.prototype.forEach.call(e.target.elements, elem => {
        elem.value = '';
    });
    await show();
};
