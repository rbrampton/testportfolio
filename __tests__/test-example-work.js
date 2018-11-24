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

describe("Example ExampleWorkBubble component", () => {
  let component = shallow(<ExampleWorkBubble example={myWork[0]} />);
  let images = component.find("img");
  it ("should contain a single image element ", () => {
      expect(images.length).toEqual(1);
      expect(images.prop('src')).toEqual(myWork[0].image.src);
      // expect(5).toEqual(6);
  });

  it ("Should allow the modal to open and close", () => {
    // component.instance().openModal();
    // expect(component.dive().instance().state.modalOpen).toBe(true);
    //
    // component.instance().closeModal();
    // expect(component.instance().state.modalOpen).toBe(false);
  });
});

describe("ExampleWork component", () => {
  let component = shallow(<ExampleWork work={myWork} />);

  it("Should be a span element", () => {
//    console.log(component.debug());
    expect(component.type()).toEqual('span');
  });

  it("Should contain as many children as there are example works", () => {
    expect(component.find("ExampleWorkBubble").length).toEqual(myWork.length);
  });

});
