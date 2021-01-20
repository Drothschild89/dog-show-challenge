document.addEventListener('DOMContentLoaded', () => {
    let dogForm = document.getElementById('dog-form')
    // dogForm.addEventListener('submit', handleSubmit)
    fetchDogs()
})

    function fetchDogs(){
        fetch('http://localhost:3000/dogs')
        .then(res => res.json())
        .then(dogs => {
            dogs.forEach(dog => showDogs(dog))
        })
    }

    function showDogs(dog){
        let tableBody = document.getElementById("table-body")
        let newRow = document.createElement('tr')
        newRow.id = dog.id

        let name = document.createElement('td')
        name.textContent = dog.name

        let breed = document.createElement('td')
        breed.textContent = dog.breed

        let sex = document.createElement('td')
        sex.textContent = dog.sex
        
        let editButton = document.createElement('button')
        editButton.textContent = 'Edit Dog'
        let editCell = document.createElement('td')
        editCell.append(editButton)
        editButton.addEventListener('click', (e) => dogListener(e, dog)) 

        newRow.append(name, breed, sex, editCell)
        tableBody.appendChild(newRow)

    }


    function dogListener(e, dog){
        let target = e.target.parentElement.parentElement
        let form = document.querySelector("#dog-form")
        form.name.value = target.querySelectorAll('td')[0].textContent
        form.breed.value = target.querySelectorAll('td')[1].textContent
        form.sex.value = target.querySelectorAll('td')[2].textContent
        let dogForm = document.getElementById('dog-form')
        dogForm.addEventListener('submit', (e) => handleSubmit(e, dog))
    }

    // let dogForm = document.getElementById('dog-form')
    // dogForm.addEventListener('submit', handleSubmit)

    function handleSubmit(e, dog){
        e.preventDefault();
        let id = dog.id
        fetch(`http://localhost:3000/dogs/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: e.target.name.value,
                breed: e.target.breed.value,
                sex: e.target.sex.value
                
            })
        })
        .then(res => res.json())
        .then(dog => {
            document.getElementById(dog.id).querySelectorAll('td')[0].textContent = dog.name
            document.getElementById(dog.id).querySelectorAll('td')[1].textContent = dog.breed
            document.getElementById(dog.id).querySelectorAll('td')[2].textContent = dog.sex
        })
    }
