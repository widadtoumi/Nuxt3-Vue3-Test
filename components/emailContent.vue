<template>
  <div :class="open ? 'email-sidebar-overlay' : 'email-sidebar-close'">
    <div class="email-sidebar" @click.stop>
      <div
        :class="['email-sidebar__container', { 'email-sidebar--active': open }]"
      >
        <div class="email-sidebar-header">
          <button @click="closeSidebar" class="action-btns__button">
            <img :src="close" alt="close" class="action-btns__button--icon" />
            Close (Esc)
          </button>
          <div class="action-btns">
            <button @click="toggleReadStatus" class="action-btns__button">
              <img
                :src="mail"
                alt="mark read"
                class="action-btns__button--icon"
              />
              {{ readButtonLabel }} (r)
            </button>
            <button @click="archiveSelectedEmails" class="action-btns__button">
              <img
                :src="trash"
                alt="archive"
                class="action-btns__button--icon"
              />
              Archive (a)
            </button>
          </div>
        </div>
        <div class="email-sidebar__content">
          <div class="email-sidebar__content--title">{{ email.sender }}</div>
          <div class="email-sidebar__content--body">{{ email.body }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import close from "@/assets/icons/x-close.svg";
import trash from "@/assets/icons/trash.svg";
import mail from "@/assets/icons/mail.svg";
import { mapMutations } from "vuex";
export default {
  name: "EmailContent",
  props: {
    email: {
      type: Object,
      default: () => ({ sender: "", subject: "", body: "" }),
    },
    open: Boolean,
  },
  data() {
    return {
      close,
      trash,
      mail,
    };
  },
  computed: {
    readButtonLabel() {
      return this.email.read ? "Mark as Unread" : "Mark as Read";
    },
  },
  mounted() {
    this.$el.addEventListener("click", this.handleOverlayClick);
  },

  beforeUnmount() {
    this.$el.removeEventListener("click", this.handleOverlayClick);
  },
  methods: {
    ...mapMutations(["toggleEmailReadStatus", "archiveEmails"]),
    closeSidebar() {
      this.$emit("close-sidebar");
    },
    archiveSelectedEmails() {
      this.archiveEmails([this.email]);
      this.closeSidebar();
    },

    toggleReadStatus() {
      this.toggleEmailReadStatus({
        emailId: this.email.id,
        read: !this.email.read,
      });
    },
    handleOverlayClick() {
      this.$emit("close-sidebar");
    },
  },
};
</script>

<style lang="scss"></style>
