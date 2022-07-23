<script>
  import {
    addDoc,
    doc,
    collection,
    onSnapshot,
    deleteDoc,
    updateDoc,
  } from "firebase/firestore";
  import { onDestroy } from "svelte";
  import { db } from "./firebase";
  import Toastify from "toastify-js";

  let task = {
    title: "",
    description: "",
  };
  let tasks = [];
  let editStatus = false;
  let currentId = '';

  const addTask = async () => {
    try {
      await addDoc(collection(db, "tasks"), {
        ...task,
        createAt: new Date(),
      });
      Toastify({
        text: "New task created",
      }).showToast();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async () => {
    try {
      await updateDoc(doc(db, "tasks", currentId), task);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!editStatus) {
        addTask();
      } else {
        updateTask();
      }
    } catch (error) {
      console.error(error);
    }

     task = {
      title: "",
      description: "",
    };

     editStatus = false;
     currentId = '';
  };

  const deleteTask = async (id) => {
    try {
      // TODO: confirm alert pending
      await deleteDoc(doc(db, "tasks", id));
      Toastify({
        style: {
          background: "red",
        },
        text: "task deleted",
      }).showToast();
    } catch (error) {
      console.error(error);
    }
  };

  const editTask = (currentTask) => {
    task.title = currentTask.title;
    task.description = currentTask.description;
    editStatus = true;
    currentId = currentTask.id;
    
  };

  const unsub = onSnapshot(
    collection(db, "tasks"),
    (querySnapshot) => {
      tasks = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
    },
    (err) => {
      console.log(err);
    }
  );

  onDestroy(unsub);
</script>

<main>
  <div class="container p-4">
    <div class="row">
      <div class="col-md-6">
        <form
          on:submit|preventDefault={handleSubmit}
          class="card card-body p-5"
        >
          <div class="mb-3">
            <label for="title" class="text-secondary fs-5">Title</label>
            <input
              bind:value={task.title}
              type="text"
              placeholder="Write a title"
              class="form-control"
            />
          </div>

          <div class="mb-3">
            <label for="description" class="text-secondary fs-5">Description</label>
            <textarea
              bind:value={task.description}
              id="description"
              rows="3"
              placeholder="Write a description"
              class="form-control"
            />
          </div>

          <div>
            <button class="btn btn-primary"> Save </button>
          </div>
         
        </form>
      </div>
      <div class="col-md-6">
        {#each tasks as task}
          <div class="card card-body mt-2">
            <div class="d-flex justify-content-between">
              <h5>{task.title}</h5>
              <i class="material-icons" on:click={editTask(task)}>edit</i>
            </div>

            <p>{task.description}</p>
            <div class="">
              <button class="btn btn-danger" on:click={deleteTask(task.id)}>
                <i class="material-icons" style="vertical-align: middle;"
                  >delete_forever</i
                > Delete
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</main>

<style>
</style>
