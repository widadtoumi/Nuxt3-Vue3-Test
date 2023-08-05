import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      emails: [
        {
          id: 0,
          sender: "John Doe",
          subject: "Hello",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
          read: false,
        },
        {
          id: 1,
          sender: "Jane Smith",
          subject: "Meeting Tomorrow",
          body: "Hey, let's discuss the project details tomorrow...",
          read: false,
        },
      ],
      selectedEmails: [],
      archivedEmails: [],
      selectedEmail: null,
      openEmail: { sender: "", subject: "", body: "" },
    };
  },
  mutations: {
    addSelectedEmail(state, email) {
      state.selectedEmails.push(email);
    },
    removeSelectedEmail(state, email) {
      const index = state.selectedEmails.findIndex((e) => e === email);
      if (index !== -1) {
        state.selectedEmails.splice(index, 1);
      }
    },
    clearSelectedEmails(state) {
      state.selectedEmails = [];
    },
    archiveEmails(state, selectedEmails) {
      state.emails = state.emails.filter(
        (email) => !selectedEmails.includes(email)
      );
      state.archivedEmails.push(...selectedEmails);
      state.selectedEmails = [];
    },
    selectEmail(state, email) {
      state.selectedEmail = email;
    },
    clearSelectedEmail(state) {
      state.selectedEmail = null;
    },
    openEmailSidebar(state, email) {
      state.openEmail = email;
    },
    closeSidebar(state) {
      state.openEmail = null;
    },
    toggleEmailReadStatus(state, payload) {
      const { emailId, read } = payload;
      const email = state.emails.find((e) => e.id === emailId);
      if (email) {
        email.read = read;
      }
    },
    unarchiveEmail(state, email) {
      state.archivedEmails = state.archivedEmails.filter(
        (e) => e.id !== email.id
      );
      state.emails.push(email);
    },
  },
  getters: {
    isSelected: (state) => (email) => {
      return state.selectedEmails.includes(email);
    },
    selectedEmails: (state) => {
      return state.selectedEmails;
    },
    archivedEmails: (state) => {
      return state.archivedEmails;
    },
    selectedArchivedEmails: (state) => {
      return state.archivedEmails.filter((email) =>
        state.selectedEmails.includes(email)
      );
    },
    getOpenSidebarEmail: (state) => {
      return state.selectedEmail;
    },
    selectedEmail: (state) => {
      return state.selectedEmail;
    },
    openEmail: (state) => {
      return state.openEmail;
    },
  },
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
});
