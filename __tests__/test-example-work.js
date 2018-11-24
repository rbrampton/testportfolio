import React from 'react';
import { shallow } from 'enzyme';
import ExampleWork, {ExampleWorkBubble} from '../js/example-work'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({adapter: new Adapter()});

const myWork = [
  {
    'title': "First Job",
    'image': {
        'desc': "example screenshot of a project involving code",
        'src': "images/example1.png",
        'comment': "Work Example"
    }
  }
];

describe("ExampleWork component", () => {
  let component = shallow(<ExampleWork work={myWork} />);

  it("Should be a section element", () => {
//    console.log(component.debug());
    expect(component.type()).toEqual('section');
  })

  it("Should contain as many children as there are example works", () => {
    expect(component.find("ExampleWorkBubble").length).toEqual(myWork.length);
  })

});

describe("Example ExampleWorkBubble component", () => {
  let component = shallow(<ExampleWorkBubble example={myWork[0]} />);
  let images = component.find("img");
  if ("should contain a single image element ", () => {
      expect(images.length).toEqual(1);
      expect(images.node.props.src).toEqual(myWork[0].image.src);
  });
});
