<template>
  <div>
    <v-card outlined>
      <h2>Service Name</h2>
      <p>Typically what the service/object do.</p>
      <v-text-field
        label="Service name"
        single-line
        dense
        outlined
        hide-details
      ></v-text-field>
    </v-card>
    <v-card outlined>
      <h2>Service Description</h2>
      <p>
        In order for the service to be found with Draape and used by others, a
        good description is recommended. What kind of data does the service
        provide?
      </p>
      <v-textarea
        outlined
        hide-details
        name="input-7-4"
        label="Description"
        value=""
      ></v-textarea>
    </v-card>
    <v-card outlined>
      <h2>Keywords</h2>
      <p>Search keywords to easily discover your service.</p>
      <v-text-field
        label="Keywords"
        single-line
        dense
        outlined
        hide-details
      ></v-text-field>
    </v-card>
    <v-card outlined>
      <h2>Service XML</h2>
      <p>
        This is the message format or API for this service. Put XML on a single
        line to make it easier to parse on the client. You may link to variables
        in other services by using @domain/servicename#variable@ notation.
        Include links in link section below.
      </p>
      <v-row>
        <v-col md="6">
          <v-text-field
            label="Schema"
            single-line
            dense
            outlined
            hide-details
          ></v-text-field>
        </v-col>
        <v-col md="6">
          <v-btn
            :color="colorBlue"
            depressed
            rounded
            medium
            dark
            link
            :to="{ name: 'createService' }"
          >
            <v-icon>{{ mdiPlus }}</v-icon>
            Create Service
          </v-btn>
        </v-col>
      </v-row>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">#</th>
              <th class="text-left">Schema</th>
              <th class="text-left">Linking to</th>
              <th class="text-left">Linking from</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in schemas" :key="item.name">
              <td>{{ index }}</td>
              <td>{{ item.name }}</td>
              <td><Dialog /></td>
              <td>{{ item.linkingFrom }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
import { mdiPlus } from "@mdi/js";
import Dialog from "./DialogForXML.vue";
export default {
  data() {
    return {
      mdiPlus,
      colorBlue: "#27AAE1",
      schemas: [
        {
          name: "light",
          linkingTo: "Add Link",
          linkingFrom: "View Links"
        },
        {
          name: "sun",
          linkingTo: "Add Link",
          linkingFrom: "View Links"
        }
      ]
    };
  },
  components: {
    Dialog
  }
};
</script>

<style>
.v-card {
  padding: 0.5em 2em 1em 2em;
  width: 75%;
}
.v-card > h2 {
  color: #58595b;
  font-size: 20px;
  font-weight: 500;
}
.v-card > p {
  color: #58595b;
  font-size: 14px;
  margin-bottom: 0.3em;
}
</style>