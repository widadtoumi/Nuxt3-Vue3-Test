<template>
  <div class="inbox">
    <div class="inbox-header">Inbox</div>
    <div class="inbox-tables">
      <table class="header-table">
        <tbody>
          <tr class="table-heading">
            <td class="multi-select">
              <input
                id="inbox-select__all"
                type="checkbox"
                :checked="isAllSelected"
                @change="toggleAllEmails"
                class="email-checkbox"
                ref="selectAllCheckbox"
              />
              <label class="select-all__checkbox-label" for="inbox-select__all">
                Email Selected ({{ selectedEmails.length }})
              </label>
            </td>
            <td class="action-btns">
              <button
                @click="toggleReadStatus"
                v-if="selectedEmails.length !== 0"
                class="action-btns__button"
              >
                <img
                  :src="mail"
                  alt="mark read"
                  class="action-btns__button--icon"
                />
                {{ readButtonLabel }} (r)
              </button>
              <button
                @click="archiveSelectedEmails"
                v-if="selectedEmails.length !== 0"
                class="action-btns__button"
              >
                <img
                  :src="trash"
                  alt="mark read"
                  class="action-btns__button--icon"
                />
                Archive (a)
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="emails-table">
        <tbody>
          <Email
            v-for="(email, index) in emails"
            :key="index"
            @click="openEmailContentSidebar(email)"
            :email="email"
            :is-selected="isSelected(email)"
            @toggle-select="toggleSelectEmail"
          />
        </tbody>
      </table>
      <EmailContent
        ref="emailContent"
        v-model="open"
        :email="openEmail"
        :open="open"
        :readButtonLabel="readButtonLabel"
        @close-sidebar="open = false"
        @markUnread="toggleReadStatus"
        @archiveEmail="archiveSelectedEmails"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import Email from "@/components/email.vue";
import EmailContent from "@/components/emailContent.vue";
import trash from "@/assets/icons/trash.svg";
import mail from "@/assets/icons/mail.svg";
export default {
  data() {
    return {
      trash,
      mail,
      open: false,
    };
  },
  components: {
    Email,
    EmailContent,
  },
  computed: {
    ...mapState(["emails"]),
    ...mapGetters(["selectedEmails", "selectedEmail", "openEmail"]),
    isAllSelected() {
      return this.selectedEmails.length === this.emails.length;
    },
    selectedEmail() {
      return this.selectedEmails.length > 0 ? this.selectedEmails[0] : null;
    },
    areAllSelectedRead() {
      return this.selectedEmails.every((email) => email.read);
    },
    readButtonLabel() {
      return this.areAllSelectedRead ? "Mark as Unread" : "Mark as Read";
    },
  },
  methods: {
    ...mapMutations([
      "addSelectedEmail",
      "removeSelectedEmail",
      "clearSelectedEmails",
      "archiveEmails",
      "selectEmail",
      "clearSelectedEmail",
      "openEmailSidebar",
      "closeSidebar",
      "toggleEmailReadStatus",
      "markEmailsAsRead",
    ]),
    isSelected(email) {
      return this.selectedEmails.includes(email);
    },
    toggleSelectEmail(email) {
      if (this.isSelected(email)) {
        this.removeSelectedEmail(email);
      } else {
        this.addSelectedEmail(email);
      }
    },
    toggleAllEmails() {
      if (this.isAllSelected) {
        this.clearSelectedEmails();
      } else {
        this.emails.forEach((email) => {
          if (!this.isSelected(email)) {
            this.addSelectedEmail(email);
          }
        });
      }
    },
    archiveSelectedEmails() {
      this.open
        ? this.archiveEmails([this.openEmail])
        : this.archiveEmails(this.selectedEmails);
      this.clearSelectedEmails();
    },

    handleKeyDown(event) {
      if (event.key === "Escape") {
        this.open = false;
      } else if (
        (event.keyCode === 65 || event.keyCode === 82) &&
        event.target.tagName !== "INPUT" &&
        event.target.tagName !== "TEXTAREA"
      ) {
        if (event.keyCode === 65) {
          this.archiveSelectedEmails();
        } else if (event.keyCode === 82) {
          this.toggleReadStatus();
        }
      }
    },
    openEmailContentSidebar(email) {
      this.openEmailSidebar(email);
      this.open = true;
    },
    toggleReadStatus() {
      if (this.open) {
        this.toggleEmailReadStatus({
          emailId: this.openEmail.id,
          read: !this.openEmail.read,
        });
      } else {
        const areAllSelectedRead = this.selectedEmails.every(
          (email) => email.read == true
        );
        const areAllSelectedUnread = this.selectedEmails.every(
          (email) => email.read == false
        );

        this.selectedEmails.forEach((email) => {
          if (areAllSelectedRead) {
            this.toggleEmailReadStatus({ emailId: email.id, read: false });
          } else if (areAllSelectedUnread) {
            this.toggleEmailReadStatus({ emailId: email.id, read: true });
          } else {
            this.toggleEmailReadStatus({ emailId: email.id, read: true });
          }
        });
      }
      this.clearSelectedEmails();
    },
  },
  mounted() {
    document.addEventListener("keydown", this.handleKeyDown);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  },
};
</script>

<style lang="scss"></style>
