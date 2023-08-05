<template>
  <div class="archive">
    <div class="archive-header">Archived Emails</div>
    <div class="archive-tables">
      <table class="header-table">
        <tbody>
          <tr class="table-heading">
            <td class="multi-select">
              <input
                id="archive-select__all"
                type="checkbox"
                :checked="isAllSelected"
                @change="toggleAllEmails"
                class="email-checkbox"
                ref="selectAllCheckbox"
              />
              <label
                class="select-all__checkbox-label"
                for="archive-select__all"
              >
                Email Selected ({{ selectedArchivedEmails.length }})
              </label>
            </td>
            <td class="action-btns">
              <button
                @click="unarchiveSelectedEmails"
                v-if="selectedArchivedEmails.length !== 0"
                class="action-btns__button"
              >
                <img
                  :src="mail"
                  alt="unarchive"
                  class="action-btns__button--icon"
                />
                Unarchive
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="emails-table">
        <tbody>
          <Email
            v-for="(email, index) in archivedEmails"
            :key="index"
            :email="email"
            :is-selected="isSelected(email)"
            @toggle-select="toggleSelectEmail"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import Email from "@/components/email.vue";
import trash from "@/assets/icons/trash.svg";
import mail from "@/assets/icons/mail.svg";
export default {
  data() {
    return {
      trash,
      mail,
    };
  },
  components: {
    Email,
  },
  computed: {
    ...mapState(["archivedEmails", "selectedEmails"]),
    ...mapGetters([
      "selectedArchivedEmails",
      "selectedEmails",
      "selectedEmail",
    ]),
    isAllSelected() {
      return this.selectedArchivedEmails.length === this.archivedEmails.length;
    },
  },
  methods: {
    ...mapMutations([
      "addSelectedEmail",
      "removeSelectedEmail",
      "clearSelectedEmails",
      "unarchiveEmail",
      "selectEmail",
      "clearSelectedEmail",
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
        this.$nextTick(() => {
          this.clearSelectedEmails();
        });
      } else {
        this.$nextTick(() => {
          this.archivedEmails.forEach((email) => {
            this.addSelectedEmail(email);
          });
        });
      }
    },
    unarchiveSelectedEmails() {
      this.archivedEmails.forEach((email) => {
        if (this.isSelected(email)) {
          this.unarchiveEmail(email);
          this.removeSelectedEmail(email);
        }
      });
    },

    handleKeyDown(event) {
      if (
        event.keyCode === 85 &&
        event.target.tagName !== "INPUT" &&
        event.target.tagName !== "TEXTAREA"
      ) {
        this.unarchiveSelectedEmails();
      }
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
