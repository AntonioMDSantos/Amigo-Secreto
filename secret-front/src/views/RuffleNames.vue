<template>
  <v-card>
    <v-app-bar color="primary" prominent>
      <v-toolbar-title style="text-align: center"
        >Resultado do sorteio</v-toolbar-title
      >
    </v-app-bar>
    <v-list>
      <v-list-item
        class="justify-center"
        v-for="(resultado, index) in resultados"
        :key="index"
      >
        <v-list-item-content>{{ resultado }}</v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-actions class="justify-center">
      <v-btn color="primary" variant="flat" @click="$router.push('/')"
        >Voltar para a Home Page</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      resultados: [],
    };
  },
  created() {
    this.resultados = this.$route.query.resultados;
  },
};
</script>

<style >
html {
  overflow: hidden;
}
</style>
