<template>
    <v-container>
        <v-navigation-drawer v-model="sideNav" container style="margin-top:40px">
            <v-list>
                <v-list-item v-for="item in items" :key="item.title">
                     <v-list-item-content>
                        <router-link :to="item.route" custom v-slot="{ navigate }"><span @click="navigate" @keypress.enter="navigate" role="link"><v-list-item-title v-text="item.title"></v-list-item-title></span></router-link>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar dark fixed container>
            <v-app-bar-nav-icon @click.native.stop="sideNav = !sideNav" class="hidden-sm-and-up">
            </v-app-bar-nav-icon>
            <v-toolbar-title>
                <router-link to="/" custom v-slot="{ navigate }"><span @click="navigate" @keypress.enter="navigate" role="link"> Re-Check-Activity </span></router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-xs-only" v-for="item in items" :key="item.title" >
              <div class="my-3">
                <v-btn :to="item.route" :color="item.color" class="mx-1" >
                  <v-icon left dark>{{ item.icon }}</v-icon>
                    {{ item.title }}
                </v-btn>
              </div>
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
        { title:"ACCUEIL", route:"/", icon: "mdi-home", color: "green" },
        { title:"BATIMENTS", route:"/batiments", icon: "mdi-office-building", color: "orange"},
        { title:"LOCAUX", route:"/locaux", icon: "mdi-home-city-outline", color: "grey" },
        { title:"PROBLEMES", route:"/problemes", icon: "mdi-alert-outline", color: "brown"},
        { title:"CONFIRMATIONS", route:"/confirmations", icon: "mdi-check-circle-outline", color: "blue"},
        { title:"UTILISATEURS", route:"/utilisateurs", icon: "mdi-account", color: "red"}
      ]
    })
}
</script>