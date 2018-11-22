import React from 'react';

class ExampleWork extends React.Component {
  render() {
    console.log("inside of example work");
    return (
      <section class="section section--alignCentered section--description">
        {
          this.props.work.map((example, idx) => {
            console.log("example is: " + example);
            return (
              <ExampleWorkBubble example={example} key={idx}/>
            )
          })
        }
      </section>
    )
  }
}

class ExampleWorkBubble extends React.Component {
  render() {
    console.log("Title: " + this.props.example.title);
    console.log("Image: " + this.props.example.image);
    console.log("Desc: " + this.props.example.image.desc);
    console.log("src: " + this.props.example.image.src);
    return (
      <div class="section__exampleWrapper">
        <div class="section__example">
          <img alt={this.props.example.image.desc}
               class="section__exampleImage"
               src={this.props.example.image.src}/>
          <dl class="color--cloud">
            <dt class="section__exampleTitle section__text--centered">
              {this.props.example.title}
            </dt>
            <dd></dd>
          </dl>
        </div>
      </div>
    )
  }
}

export default ExampleWork
