// pages/api/store.js
class Store {
    constructor() {
      this.phoneNumbers = new Set();
      this.messagesStore = {};
    }
  
    addPhoneNumber(number) {
      this.phoneNumbers.add(number);
    }
  
    getPhoneNumbers() {
      return Array.from(this.phoneNumbers);
    }
  
    addMessage(number, message) {
      if (!this.messagesStore[number]) {
        this.messagesStore[number] = [];
      }
      this.messagesStore[number].push(message);
    }
  
    getMessages(number) {
      return this.messagesStore[number] || [];
    }
  }
  
  const store = new Store();
  
  export default store;
  