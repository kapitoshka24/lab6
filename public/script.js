const show = async() => {
    const data = await fetchData();
    const root = document.getElementById("root");
    root.innerHTML = `<table class="table table-striped table-sm">
    <thead>
      <tr>
        <th>id</th>
        <th>Name</th>
        <th>Group</th>
      </tr>
    </thead>
    <tbody>
    ${data.map(elem => (
    `<tr>
        <td>${elem.id}</td>
        <td>${elem.name}</td>
        <td>${elem.group1}</td>
      </tr>`
    ))}
    </tbody>` 

}

const fetchData= async() => 
{
const data = await fetch('http://localhost:3000/api/').then(response => {
        if(response.ok) {
            return response.json()
        }
    }).then(data => {
        return data;
    })
    return data;
}

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const {elements} = e.target;
    const data = {
        name: elements[0].value,
        group: elements[1].value
    }
    console.log(data);
    await fetch('http://localhost:3000/api/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    e.target.elements.forEach(elem => {
        elem.value = '';
    });

    await show();
})
