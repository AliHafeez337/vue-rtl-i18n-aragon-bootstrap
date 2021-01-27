<template>
  <div>

    <modal :show.sync="mealFormModal">

      <base-alert 
        v-for="(element, index) in errorMessages"
        :key="index"
        :type="element.type" 
        dismissible
      >
        <span slot="text" style="color: black;"><strong>{{ element.name }}</strong> {{ element.message }}</span>
      </base-alert>

      <h6 slot="header" class="modal-title" id="modal-title-default">Meal form</h6>

      <div class="longModal">
        <div class="row">
          <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <label>Name</label>
            <base-input 
              placeholder="Name"
              v-model="meal.name"
            >
            </base-input>
          </div>
        </div>
        <div class="row">
          <div class="col col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label>Images</label>
            <br />
            <base-button 
              class="btn-2" 
              type="primary" 
              icon="ni ni-fat-add"
              style="width: 100%"
              @click="$refs.image.click()"
            >
              Add Images
            </base-button>
            <input 
              multiple
              type="file" 
              ref="image"
              style="display: none;"
              accept="image/*"
              @change="onFileSelect"
              :disabled="disabledArr.includes('image')"
            />
          </div>
          <div class="col col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label>Ingredients</label>
            <div class="row">
              <div class="col-lg-8 col-sm-8">
                <base-input 
                  placeholder="Add Ingredient"
                  v-model="ingredient"
                >
                </base-input>
              </div>
              <div class="col-lg-4 col-sm-4">
                <base-button 
                  class="btn-2" 
                  type="primary" 
                  icon="ni ni-fat-add"
                  @click="addIngredient"
                >
                </base-button>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="(images && images.length) || (ingredients && ingredients.length)">
          <div class="col col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <br />
            <ul>
              <li
                v-for="(element, index) in images"
                :key="index"
                class="mb-3"
              >
                {{ element.name }}
                <base-button 
                  class="btn-2" 
                  type="danger" 
                  icon="ni ni-fat-remove"
                  style="float: right;"
                  @click="images.splice(index, 1)"
                >
                </base-button>
              </li>
            </ul>
          </div>
          <div class="col col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <br />
            <ul>
              <li
                v-for="(element, index) in ingredients"
                :key="index"
                class="mb-3"
              >
                {{ element }}
                <base-button 
                  class="btn-2" 
                  type="danger" 
                  icon="ni ni-fat-remove"
                  style="float: right;"
                  @click="ingredients.splice(index, 1)"
                >
                </base-button>
              </li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label>Nutritional Facts Image</label>
            <br />
            <base-button 
              class="btn-2" 
              type="primary" 
              icon="ni ni-fat-add"
              style="width: 100%"
              @click="$refs.image1.click()"
            >
              Add Image
            </base-button>
            <input 
              multiple
              type="file" 
              ref="image1"
              style="display: none;"
              accept="image/*"
              @change="onFileSelect1"
              :disabled="disabledArr.includes('image1')"
            />
          </div>
          <div class="col col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label></label>
            <br />
            {{ imageName }}
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <label>Select Meal Type</label>
            <br />
            <base-dropdown class="nav-item" menu-classes="dropdown-menu-xl">
              <a :key="updateDropdown" slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                  <span v-if="meal && meal.mealType" class="nav-link-inner--text">{{ meal.mealType }}</span>
                  <span v-else class="nav-link-inner--text">Select Meal Type</span>
                  &nbsp;
                  <i class="ni ni-bold-down"></i>
              </a>
              <div class="dropdown-menu-inner">
                <a 
                  class="dropdown-item" 
                  @click="setMealType('Breakfast')" 
                  href="#"
                >
                  Breakfast
                </a>
                <a 
                  class="dropdown-item" 
                  @click="setMealType('Lunch')" 
                  href="#"
                >
                  Lunch
                </a>
                <!-- <div class="dropdown-divider"></div> -->
                <a 
                  class="dropdown-item" 
                  @click="setMealType('Dinner')" 
                  href="#"
                >
                  Dinner
                </a>
              </div>
            </base-dropdown>
          </div>
        </div>
        <div class="row">
          <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <label>Description</label>
            <base-input 
              placeholder="Description"
              v-model="meal.description"
            >
            </base-input>
          </div>
        </div>

      </div>

      <template slot="footer">
        <base-button type="primary" @click="save">Save changes</base-button>
        <base-button type="link" class="ml-auto" @click="mealFormModal = false">Close
        </base-button>
      </template>
    </modal>

  </div>
</template>

<script>

export default {
  props: {
    disabledArr: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    mealFormModal: true,
    errorMessages: [],
    images: [],
    meal: {},
    ingredients: [],
    ingredient: '',
    imageName: '',
    updateDropdown1: 0
  }),
  computed: {
    updateDropdown: {
      set(val) {
        this.updateDropdown1++
      },
      get() {
        return 'updateDropdown-' + this.updateDropdown1.toString()
      }
    }
  },
  methods: {
    save() {
      if (this.meal) {
        let errorsCount = 0

        if (!this.meal.name) {
          this.writeMessage({
            type: "warning",
            name: "Warning",
            message: 'Name is required.'
          }, 4000)
          errorsCount++
        }
        if (!(this.ingredients && this.ingredients[0] )) {
          this.writeMessage({
            type: "warning",
            name: "Warning",
            message: 'Ingredients are required.'
          }, 4000)
          errorsCount++
        } else {
          this.meal.ingredients = this.ingredients
        }
        if (!this.meal.image || !this.imageName) {
          this.writeMessage({
            type: "warning",
            name: "Warning",
            message: 'Nutritional Facts Image is required.'
          }, 4000)
          errorsCount++
        }
        if (!this.meal.mealType) {
          this.writeMessage({
            type: "warning",
            name: "Warning",
            message: 'Meal type is required.'
          }, 4000)
          errorsCount++
        }

        if (!errorsCount) {
          console.log('Send request', this.meal)
        }

      } else {
        this.writeMessage({
          type: "warning",
          name: "Warning",
          message: 'Please fill the form.'
        })
      }
    },
    setMealType(type) {
      this.meal.mealType = type
      this.updateDropdown++
    },
    addIngredient(val) {
      if (this.ingredient) {
        this.ingredients.push(this.ingredient)
        this.ingredient = ''
      } else {
        this.writeMessage({
          type: "warning",
          name: "Warning",
          message: 'Please write an ingredient name.'
        })
      }
    },
    onFileSelect1(e) {
      // console.log(e.target.files)
      if (e.target.files && e.target.files[0]){
        if (e.target.files[0].size < 1000000) {
          this.meal.image = e.target.files[0]
          this.imageName = e.target.files[0].name
        } else {
          this.writeMessage({
            type: "warning",
            name: "Warning",
            message: `File ${e.target.files[0].name} should be less than 5MB.`
          })
        }
      } else {
        this.writeMessage({
          type: "warning",
          name: "Warning",
          message: 'Please select a file.'
        })
      }
    },
    onFileSelect(e) {
      // console.log(e.target.files)
      if (e.target.files && e.target.files[0]){
        for(let i = 0; i < e.target.files.length; i++) {

          let file = e.target.files[i]
          console.log(file)
          if (file.size < 1000000) {
            this.images.push(file)
          } else {
            this.writeMessage({
              type: "warning",
              name: "Warning",
              message: `File ${file.name} should be less than 1MB.`
            })
          }
        }

      } else {
        this.writeMessage({
          type: "warning",
          name: "Warning",
          message: 'Please select a file.'
        })
      }
    },
    writeMessage(msg, time) {
      this.errorMessages.push(msg)
      if (time) {
        setTimeout(() => {
          let index = this.errorMessages.findIndex(a => a.type === msg.type && a.name === msg.name && a.message === msg.message)
          this.errorMessages.splice(index, 1)
        }, time)
      } else {  
        setTimeout(() => {
          let index = this.errorMessages.findIndex(a => a.type === msg.type && a.name === msg.name && a.message === msg.message)
          this.errorMessages.splice(index, 1)
        }, 2000)
      }

      // this.errorMessages.push({
      //   type: "success",
      //   name: "Success",
      //   message: 'File should be less than 1MB.'
      // })
      // this.errorMessages.push({
      //   type: "danger",
      //   name: "Danger",
      //   message: 'File should be less than 1MB.'
      // })
    },
  }
}
</script>

<style>
.longModal {
  overflow-y: auto; 
  height: 450px;
}

.longModal::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.longModal {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

</style>