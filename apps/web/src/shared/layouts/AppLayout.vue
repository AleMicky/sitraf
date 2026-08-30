<script setup lang="ts">
import { computed, h, ref } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

import {
  NConfigProvider,
  NDialogProvider,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutSider,
  NMenu,
  NMessageProvider,
  NNotificationProvider,
  NSpace,
  NText,
  type MenuOption,
} from 'naive-ui'

import { Building2, Home, MapPinned, Package } from '@lucide/vue'

const collapsed = ref(false)

const route = useRoute()

function renderIcon(icon: typeof Home) {
  return () =>
    h(icon, {
      size: 18,
    })
}

function renderLink(label: string, name: string) {
  return () =>
    h(
      RouterLink,
      {
        to: {
          name,
        },
      },
      {
        default: () => label,
      },
    )
}

const menuOptions: MenuOption[] = [
  {
    label: renderLink('Inicio', 'home'),
    key: 'home',
    icon: renderIcon(Home),
  },
  {
    label: renderLink('Agencias', 'agencias'),
    key: 'agencias',
    icon: renderIcon(Building2),
  },
  {
    label: renderLink('Rutas', 'rutas'),
    key: 'rutas',
    icon: renderIcon(MapPinned),
  },
  {
    label: renderLink('Encomiendas', 'encomiendas'),
    key: 'encomiendas',
    icon: renderIcon(Package),
  },
]

const activeKey = computed(() => {
  return String(route.meta.menuKey ?? route.name ?? '')
})
</script>

<template>
  <NConfigProvider>
    <NMessageProvider>
      <NDialogProvider>
        <NNotificationProvider>
          <NLayout has-sider style="height: 100vh">
            <NLayoutSider
              bordered
              collapse-mode="width"
              :collapsed-width="64"
              :width="240"
              :collapsed="collapsed"
              show-trigger
              @collapse="collapsed = true"
              @expand="collapsed = false"
            >
              <div style="height: 64px; display: flex; align-items: center; padding: 0 18px">
                <NSpace align="center" :wrap="false">
                  <Package :size="24" />

                  <NText v-if="!collapsed" strong> Encomiendas </NText>
                </NSpace>
              </div>

              <NMenu
                :collapsed="collapsed"
                :collapsed-width="64"
                :collapsed-icon-size="20"
                :value="activeKey"
                :options="menuOptions"
              />
            </NLayoutSider>

            <NLayout>
              <NLayoutHeader
                bordered
                style="
                  height: 64px;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 0 24px;
                "
              >
                <NText strong> Sistema de Encomiendas </NText>

                <NText depth="3"> Usuario </NText>
              </NLayoutHeader>

              <NLayoutContent content-style="padding: 24px;">
                <RouterView />
              </NLayoutContent>
            </NLayout>
          </NLayout>
        </NNotificationProvider>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>
