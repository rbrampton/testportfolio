import React from 'react';
import ExampleWorkModal from './example-work-modal';

class ExampleWork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'modalOpen': false,
      'selectedExample': this.props.work[0]
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(evt, example) {
    this.setState({
      'modalOpen': true,
      'selectedExample': example
    });
  }

  closeModal(evt) {
    this.setState({
      'modalOpen': false
    });
  }

  render() {
    //console.log("inside of example work");
    return (
      <span>
        <section class="section section--alignCentered section--description">
          {
            this.props.work.map((example, idx) => {
              //console.log("example is: " + example);
              return (
                <ExampleWorkBubble example={example} key={idx}
                  openModal={this.openModal}
                  closeModal={this.closeModal}/>
              )
            })
          }
        </section>

        <ExampleWorkModal example = {this.state.selectedExample}
          open={this.state.modalOpen} closeModal={this.closeModal}/>
      </span>
    )
  }
}

class ExampleWorkBubble extends React.Component {
  render() {
    /*console.log("Title: " + this.props.example.title);
    console.log("Image: " + this.props.example.image);
    console.log("Desc: " + this.props.example.image.desc);
    console.log("src: " + this.props.example.image.src);
    */
    return (
      let example = this.props.example;
      <div class="section__exampleWrapper"
        onClick={(evt) => this.props.open(evt, example) }>
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

export default ExampleWork;
export {ExampleWorkBubble};
