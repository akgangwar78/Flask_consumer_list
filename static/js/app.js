// Fetch consumers on page load
document.addEventListener('DOMContentLoaded', loadConsumers);

function loadConsumers() {
    fetch('/api/consumers')
        .then(response => response.json())
        .then(data => {
            const consumerList = document.getElementById('consumerList');
            consumerList.innerHTML = '';
            data.forEach(consumer => {
                consumerList.innerHTML += `
                    <tr>
                        <td>${consumer.name}</td>
                        <td>${consumer.email}</td>
                        <td>${consumer.phone}</td>
                        <td>
                            <button class="btn btn-warning" onclick="editConsumer(${consumer.id})">Edit</button>
                            <button class="btn btn-danger" onclick="deleteConsumer(${consumer.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function showAddForm() {
    document.getElementById('consumerForm').classList.remove('d-none');
    document.getElementById('formTitle').innerText = 'Add Consumer';
    document.getElementById('consumerId').value = '';
}

function editConsumer(id) {
    fetch(`/api/consumer/${id}`)
        .then(response => response.json())
        .then(consumer => {
            document.getElementById('consumerForm').classList.remove('d-none');
            document.getElementById('formTitle').innerText = 'Update Consumer';
            document.getElementById('name').value = consumer.name;
            document.getElementById('email').value = consumer.email;
            document.getElementById('phone').value = consumer.phone;
            document.getElementById('consumerId').value = consumer.id;
        });
}

function deleteConsumer(id) {
    fetch(`/api/consumer/${id}`, { method: 'DELETE' })
        .then(() => loadConsumers());
}

function submitForm(event) {
    event.preventDefault();

    const id = document.getElementById('consumerId').value;
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/consumer/${id}` : '/api/consumers';
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(() => {
        loadConsumers();
        hideForm();
    });
}

function hideForm() {
    document.getElementById('consumerForm').classList.add('d-none');
}

function searchConsumer() {
    const searchValue = document.getElementById('searchConsumer').value.toLowerCase();
    const rows = document.querySelectorAll('#consumerList tr');
    rows.forEach(row => {
        const name = row.querySelector('td').innerText.toLowerCase();
        row.style.display = name.includes(searchValue) ? '' : 'none';
    });
}

function sortTable(column) {
    const rowsArray = Array.from(document.querySelectorAll('#consumerList tr'));
    rowsArray.sort((a, b) => {
        const aText = a.cells[column].innerText;
        const bText = b.cells[column].innerText;
        return aText.localeCompare(bText);
    });
    const tableBody = document.getElementById('consumerList');
    tableBody.innerHTML = '';
    rowsArray.forEach(row => tableBody.appendChild(row));
}

