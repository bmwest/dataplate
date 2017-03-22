import React, { Component } from 'react';
import RecipeList from './RecipeList'

class AppIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      currentPage: 1,
      recipesPerPage: 6
    };
    this.getData = this.getData.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  getData() {
    fetch('http://localhost:3000/api/v1/recipes')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} ($response.statusText)`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => {
      return response.json();
    })
    .then(body => {
      console.log(body);
    })
    .then(body => {
      this.setState({recipes: body})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getData();
    debugger;
  }

  render() {
    let recipeData = this.state.recipes.map((recipe) => {
      return (
        <RecipeList
          id={recipe.id}
          key={recipe.id}
          name={recipe.name}
          body={recipe.description}
          hours={recipe.minutes/60}
          minutes={recipe.minutes}
          video={recipe.video}
          photo={recipe.photo}
        />
      )
    });
    console.log(this.state.recipes)
    console.log(recipeData)
    return(
      <div className="recipe-list">
          <RecipeList
          recipes={recipeData}
          />
      </div>
    )
  }
};

export default AppIndex
