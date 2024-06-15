


const favchap = document.querySelector('#favchap')
const addbutton = document.querySelector('#addbutton')
const mylist = document.getElementById('list')


addbutton.addEventListener('click', () => {
    if (favchap.value == ''){
        console.log("You didn't type anything!!!")
        favchap.focus()
        return
    }

    let newitem = document.createElement("li")

    let deletebutton = document.createElement("button")

    newitem.innerText = favchap.value

    deletebutton.innerText = '❌'

    newitem.append(deletebutton)

    mylist.append(newitem)

    deletebutton.addEventListener('click', () => {
        newitem.remove()
        favchap.focus()
    })

    favchap.value = ''
})

