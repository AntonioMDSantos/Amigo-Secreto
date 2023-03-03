<template>
  <v-card class="card">
    <v-app-bar color="black" prominent>
      <v-toolbar-title style="text-align: center"
        >Resultado do sorteio</v-toolbar-title
      >
    </v-app-bar>
    <v-list class="list">
      <v-list-item
        class="justify-center list-item"
        v-for="(resultado, index) in resultados"
        :key="index"
      >
        <v-list-item-content class="list-item-content">{{ resultado }}</v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-actions class="justify-center">
      <v-btn color="black" variant="flat" @click="$router.push('/')"
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

.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
}

.app-bar {
  padding: 10px;
}

.list {
  padding: 10px;
}

.list-item {
  background-color: #FFFFFF;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.list-item-content {
  font-size: 18px;
  color: #333333;
}

.v-btn {
  border-radius: 50px;
  font-size: 16px;
  padding: 8px 16px;
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
