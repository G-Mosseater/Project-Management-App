import Sidebar from "./components/Sidebar";
import NewProject from "./components/NewProject";
import NoProjSelected from "./components/NoProjSelected";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject";

function App() {
  //managing the state as an object, Keeps track of All projects (projects array), and
  //  which project is currently selected (selectedProjectId)
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined, // undefined = no project selected yet
    projects: [], // start with an empty array of projects
    tasks: [],
  });


//   This function adds a new task to the project.

// setProjectsState updates the state immutably using the previous state

// taskId is generated using Math.random()

// The new task object has:

// text: the task description

// id: unique identifier

// projectId: associates the task with the currently selected project

// The new task is appended to the tasks array: [newTask, ...prevState.tasks]
// Passed task through prop
  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        id: taskId,
        projectId: prevState.selectedProjectId,
      };
      return {
        ...prevState,
        tasks:[newTask, ...prevState.tasks],
      };
    });
  }
//removes a task from your project’s state.
  function handleDeleteTask(id) {

     setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          (task) => task.id !== id    //keeps all tasks except the one with the id we want to delete
        ),
      };
    });
  }

  //this function is to update projectsState.selectedProjectId
  // whenever the user clicks on a project in the sidebar.
  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  //  Called when the user wants to start creating a new
  function handleStartProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null, // set this to null to show "new project" mode
      };
    });
  }
  function handleCancelAdd() {
    setProjectsState((prevState) => {
      return {
        ...prevState, // keep all other properties unchanged
        selectedProjectId: undefined, // reset this  property
      };
    });
  }

  function handleAddProject(projectData) {
    //update state based on previous state
    setProjectsState((prevState) => {
      // create a new project object with a unique id
      const newProject = {
        ...projectData, // copy all data from the form
        id: Math.random(), // give it a random id
      };
      //return the updated state
      return {
        ...prevState, // keep other state properties
        selectedProjectId: undefined, // go back to no project screen
        projects: [...prevState.projects, newProject], // add new project to array
      };
    });
  }
  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined, //reset selection
        //dont edit the original array[]
        // loops through all existing projects and keeps only those whose ID does not match the currently
        // selected one
        //✅Uses .filter() (which returns a new array) so the original state array is not mutated
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  // without this you will only get the project id, without title,description, date
  // looks through the array and returns first project object that matches the condition
  // checks if the project.id is equal to the selectedProjectId
  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );
  console.log(projectsState);
  //  Decide what content to show in the main area based on selectedProjectId
  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );
  if (projectsState.selectedProjectId === null) {
    // If it's null → user is adding a new project

    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAdd} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    // If it's undefined → no project selected yet  show placeholder message

    content = <NoProjSelected onStartAddProject={handleStartProject} />;
  }
  return (
    <main className="h-screen  my-2 flex gap-8">
      <Sidebar
        onSelectProject={handleSelectProject}
        onStartAddProject={handleStartProject}
        projects={projectsState.projects}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
