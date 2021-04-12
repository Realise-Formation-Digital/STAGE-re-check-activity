<template>
    <v-container>
        <v-navigation-drawer v-model="sideNav" container style="margin-top:20px">
            <v-list>
                <v-list-item v-for="item in items" :key="item.title" @click="onClickMenuItem(item.title)">
                     <v-list-item-content>
                        <router-link :to="item.route" tag="span" style="cursor: pointer"><v-list-item-title v-text="item.title"></v-list-item-title></router-link>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar dark fixed container  >
            <v-app-bar-nav-icon @click.native.stop="sideNav = !sideNav" class="hidden-sm-and-up">
            </v-app-bar-nav-icon>
            <v-toolbar-title>
                <router-link to="/" tag="span" style="cursor: pointer"> Re-Check-Activity </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-xs-only">
              <v-btn color="primary" class="mx-1" v-for="item in items" :key="item.title" @click="onClickMenuItem(item.title)">
                    <router-link :to="item.route" tag="span" style="cursor: pointer"><v-icon left dark>{{ item.icon }}</v-icon>
                    {{ item.title }}</router-link>
              </v-btn>
            </v-toolbar-items>
        </v-app-bar>
    </v-container>
</template>
<script>
export default {
  name: "Navbar",
    data: () => ({
      sideNav: false,
      items: [
        { title:"ACCUEIL", route:"/", icon: "mdi-home" },
        { title:"BATIMENTS", route:"/batiments", icon: "mdi-office-building"},
        { title:"LOCAUX", route:"/locaux", icon: "mdi-home-city-outline" }
      ]
    })
}
</script>