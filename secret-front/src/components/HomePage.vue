<template>
  <v-card>
    <v-layout class="fill-height">
      <v-app-bar color="black" prominent>
        <v-img
          src="../assets/img/boostech_log.png"
          max-height="50"
          min-height="50"
          min-width="300"
          max-width="300"
          contain
        ></v-img>
        <v-spacer></v-spacer>
        <v-btn
          icon="mdi-magnify"
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-btn>
        <v-btn icon="mdi-plus" @click="dialogAdd = true"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        style="border-bottom: 1px solid black"
        v-model="drawer"
        location="botom"
        permanent
        width="45"
        rounded
      >
        <v-text-field
          density="compact"
          label="Pesquise por nome ou email"
          prepend-inner-icon="mdi-magnify"
          variant="underline"
          single-line
          hide-details
          v-model="searchTerm"
          keyup="searchUsers"
        ></v-text-field>
      </v-navigation-drawer>

      <v-main class="flex-grow-1">
        <v-table>
          <thead>
            <tr>
              <th class="text-center">Nome</th>
              <th class="text-center">Email</th>
              <th class="text-center">Edit</th>
              <th class="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in filteredUsers"
              :key="user.id"
              @click="selectedUser = user"
            >
              <td class="text-center">{{ user.nome }}</td>
              <td class="text-center">{{ user.email }}</td>
              <td class="text-center">
                <v-btn
                  class="mx-2"
                  color="teal accent-4"
                  @click="
                    selectedUser = { ...user, editing: true };
                    dialogUpdate = true;
                    userId = user.id;
                  "
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn
                  class="mx-2"
                  color="red accent-4"
                  @click="
                    dialogDelete = true;
                    userId = user.id;
                  "
                >
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-main>
      <v-dialog v-model="dialogAdd" max-width="500">
        <AddUser
          @close="dialogAdd = false"
          @action="create($event.nome, $event.email)"
          :selectedUser="selectedUser"
        />
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500">
        <DeleteUser
          @close="dialogDelete = false"
          @deletar="deleteUser(userId)"
        />
      </v-dialog>
      <v-dialog v-model="dialogUpdate" max-width="500">
        <UpdateUser
          @close="dialogUpdate = false"
          :selectedUser="selectedUser"
          @action="updateUser"
        />
      </v-dialog>
    </v-layout>
    <v-card style="text-align: center">
      <v-btn class="mx-2" color="black" @click="sortear()">
        Sortear
      </v-btn>
    </v-card>
    <v-snackbar
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :top="true"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </v-card>
</template>

<script>
import AddUser from "./AddUser.vue";
import DeleteUser from "./DeleteUser.vue";
import UpdateUser from "./UpdateUser.vue";

export default {
  components: {
    AddUser,
    DeleteUser,
    UpdateUser,
  },
  data: () => ({
    drawer: false,
    dialogAdd: false,
    dialogDelete: false,
    dialogUpdate: false,
    group: null,
    selectedUser: {},
    users: [],
    sorteio: null,
    searchTerm: "",
    snackbar: {
      show: false,
      text: "",
      timeout: 3000,
      color: "",
    },
  }),
  computed: {
    filteredUsers() {
  return this.users.filter(
    (user) => {
      const emailPrefix = user.email.split('@')[0];
      return emailPrefix.toLowerCase().includes(this.searchTerm.toLowerCase()) || user.nome.toLowerCase().includes(this.searchTerm.toLowerCase());
    }
  );
},
  },
  created() {
    this.loadUsers();
  },
  methods: {
    loadUsers() {
      fetch("http://localhost:8000/list")
        .then((res) => res.json())
        .then((data) => {
          this.users = data.map((user) => {
            return { ...user, editing: false };
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async searchUsers() {
      try {
        const res = await fetch(
          `http://localhost:8000/search?term=${this.searchTerm}`
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          this.users = data.map((user) => {
            return { ...user, editing: false };
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    create(nome, email) {
      const exists = this.users.some((user) => user.email === email);

      if (exists) {
        this.snackbar = {
          show: true,
          text: "O e-mail inserido j?? est?? em uso!",
          timeout: 3000,
          color: "red",
        };
        return;
      }
      fetch("http://localhost:8000/create", {
        method: "POST",
        body: JSON.stringify({ nome: nome, email: email }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(() => {
          this.loadUsers();
          this.snackbar = {
            show: true,
            text: "Cadastrado com sucesso",
            timeout: 2000,
            color: "green",
          };
          this.dialogAdd = false;
        })
        .catch((error) => {
          console.error("Erro ao adicionar usu??rio:", error);
        });
    },
    deleteUser(id) {
      fetch(`http://localhost:8000/delete/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          this.loadUsers();
          this.dialogDelete = false;
          this.snackbar = {
            show: true,
            text: "Usuario deletado com sucesso",
            timeout: 2000,
            color: "success",
          };
        })
        .catch((error) => {
          console.error(error);
        });
    },
    updateUser(id, nome, email) {
      fetch(`http://localhost:8000/update/${id}`, {
        method: "PUT",
        body: JSON.stringify({ nome: nome, email: email }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(() => {
          this.loadUsers();
          this.dialogUpdate = false;
          this.snackbar = {
            show: true,
            text: "Usu??rio atualizado com sucesso",
            timeout: 2000,
            color: "success",
          };
        })
        .catch((error) => {
          console.error("Erro ao atualizar usu??rio:", error);
        });
    },
    sortear() {
      const shuffledUsers = this.users.slice().sort(() => Math.random() - 0.5);
      const sortedUsers = shuffledUsers.map((user, index) => {
        const nextUser = shuffledUsers[index + 1] || shuffledUsers[0];
        return `${user.nome} saiu com ${nextUser.nome}`;
      });
      this.$router.push({
        path: "/ruffle",
        query: { resultados: sortedUsers },
      });
    },
  },
};
</script>

