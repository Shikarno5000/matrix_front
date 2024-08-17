<template>
  <ClientOnly>
    <template v-if="store.user">
      <Menu as="div" class="relative inline-block md:hidden">
        <MenuButton>
          <MBtn class="" icon-start="mdi:user" icon-end="tabler:chevron-down" />
        </MenuButton>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute right-0 mt-2 w-64 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-10"
          >
            <div class="p-3 grid gap-1 text-center">
              <div class="font-semibold">
                {{ store.user.name_short }}
              </div>
              <div v-if="store.user.user_role_id" class="m-text-muted">
                ({{ staticDataGetNameById('user_roles',store.user.user_role_id) }})
              </div>
            </div>
            <hr>
            <LayoutsTheme />
            <hr>
            <div class="px-3 py-2">
              <button @click="auth.logout()">
                <Icon
                  name="mdi:logout"
                  class="mr-2 h-5 w-5"
                />
                Выйти
              </button>
            </div>
          </MenuItems>
        </transition>
      </Menu>
      <div class="hidden md:inline-block ">
        <div class="flex items-center gap-2">
          <LayoutsTheme />
          <span class="font-semibold">
            {{ store.user.name_short }}
          </span>
          <div v-if="store.user.user_role_id" class="m-text-muted">
            ({{ staticDataGetNameById('user_roles',store.user.user_role_id) }})
          </div>
          <MBtn class="m-btn--small" icon-start="mdi:logout" text="Выйти" @click="auth.logout()" />
        </div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import { useAuthStore } from '~/store/auth'
const store = useAuthStore()
const auth = useAuth()
</script>
