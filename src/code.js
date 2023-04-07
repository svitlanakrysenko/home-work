class Item {
    constructor(id, title, date, description) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.description = description;
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

const storage = new ItemStorage();

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
    console.log(storage.getAll());
}