<template>
  <div class="sidebar">
    <div class="sidebar__content">
      <img class="sidebar__logo" :src="logo" alt="logo" />
      <div class="sidebar__links">
        <NuxtLink
          class="sidebar__links__item"
          :class="{ sidebar__links__item__selected: $route.path === '/' }"
          to="/"
        >
          <div class="sidebar__links__item__title">
            <img class="sidebar__links__item__icon" :src="inbox" alt="" />
            Inbox
          </div>
          <div class="emails__count">{{ emails.length }}</div>
        </NuxtLink>
        <NuxtLink
          class="sidebar__links__item"
          :class="{
            sidebar__links__item__selected: $route.path === '/archive',
          }"
          to="/archive"
        >
          <div class="sidebar__links__item__title">
            <img class="sidebar__links__item__icon" :src="archive" alt="" />
            Archive
          </div>
          <div class="emails__count">{{ archivedEmails.length }}</div>
        </NuxtLink>
      </div>
    </div>
    <div class="logout sidebar__links">
      <NuxtLink
        class="sidebar__links__item"
        :class="{ sidebar__links__item__selected: $route.path === '/logout' }"
        to="/logout"
      >
        <div class="sidebar__links__item__title">
          <img class="sidebar__links__item__icon" :src="logout" alt="" />
          Logout
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import logo from "@/assets/Logo.svg";
import inbox from "@/assets/icons/inbox.svg";
import archive from "@/assets/icons/archive.svg";
import logout from "@/assets/icons/logout.svg";

export default {
  name: "SideBar",
  data() {
    return {
      logo,
      inbox,
      archive,
      logout,
    };
  },
  computed: {
    ...mapState(["emails", "archivedEmails"]),
  },
};
</script>

<style lang="scss"></style>
