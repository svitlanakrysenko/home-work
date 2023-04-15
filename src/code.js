class Item {
    constructor(id, title, date, description) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.description = description;
        this.isSelected = false;
    }
}

class ItemStorage {
    itemName = 'savedItems';

    getAll() {
        const savedValue = localStorage.getItem(this.itemName);
        return savedValue == null ? [] : JSON.parse(savedValue);
    }

    get(id) {
        const items = this.getAll();
        return items.find(x => x.id === id);
    }

    saveAll(items) {
        localStorage.setItem(this.itemName, JSON.stringify(items));
    }

    createOrUpdate(item) {
        const savedItems = this.getAll();
        const savedItem = savedItems.find(x => x.id === item.id);
        if (savedItem) {
            savedItem.title = item.title;
            savedItem.date = item.date;
            savedItem.description = item.description;
        } else {
            savedItems.push(item);
        }

        this.saveAll(savedItems);
    }
}

class SelectedIdStorage {
    key = 'selectedItemsIds';

    isSelected(id) {
        const savedIds = this.getAll();
        return savedIds.includes(id);
    }

    add(id) {
        const savedIds = this.getAll();
        if (!savedIds.includes(id)) {
            savedIds.push(id);
            this.saveAll(savedIds);
        }
    }

    remove(id) {
        const savedIds = this.getAll();
        const filteredArray = savedIds.filter(x => x !== id);
        this.saveAll(filteredArray);
    }

    getAll() {
        const savedValue = localStorage.getItem(this.key);
        return savedValue == null ? [] : JSON.parse(savedValue);
    }

    saveAll(ids) {
        localStorage.setItem(this.key, JSON.stringify(ids));
    }
}

const storage = new ItemStorage();
const selectedIdStorage = new SelectedIdStorage();

function navigateToNewItem() {
    location.href = 'file:///E:/projects/home-work/src/item.html';
}

function generateNewId() {
    const allIds = storage.getAll().map(x => x.id);
    let maxId = allIds.length === 0 ? 0 : Math.max(...allIds);
    return maxId + 1;
}

function createItem() {
    const id = generateNewId();
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const item = new Item(id, title, date, description);
    storage.createOrUpdate(item);
    navigateToNewList();
}

function showItems() {
    const items = storage.getAll();
    items.forEach(element => createAndInsertItem(element));
}

function createAndInsertItem(item) {
    const rootElement = document.createElement('div');
    rootElement.setAttribute('class', 'item');
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'checkbox');
    inputElement.setAttribute('class', 'checkbox');
    inputElement.setAttribute('id', `item${item.id}`);
    inputElement.checked = selectedIdStorage.isSelected(item.id);
    inputElement.addEventListener("change", function() { changeSelectedId(this.checked, item.id); });
    const labelElement = document.createElement('label');
    labelElement.setAttribute('class', 'item-name');
    labelElement.setAttribute('for', `item${item.id}`);
    labelElement.setAttribute('title', item.title);
    labelElement.innerText = item.title;
    const buttonElement = document.createElement('button');
    buttonElement.innerText = 'edit';
    buttonElement.setAttribute('class', 'material-icons icon-font-size');
    buttonElement.addEventListener("click", () => editFunction(item.id));
    rootElement.appendChild(inputElement);
    rootElement.appendChild(labelElement);
    rootElement.appendChild(buttonElement);
    const container = document.getElementById('container');
    container.appendChild(rootElement);
}

function changeSelectedId(isSelected, id) {
    isSelected
        ? selectedIdStorage.add(id)
        : selectedIdStorage.remove(id);
}

function navigateToNewList() {
    location.href = 'file:///E:/projects/home-work/src/index.html';
}