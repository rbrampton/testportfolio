import React from 'react';
import { shallow } from 'enzyme';
import ExampleWorkModal from '../js/example-work-modal';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

const myWorkExample = {
    'title': "First Job",
    'href': "https://example.com",
    'desc': "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    'image': {
        'desc': "example screenshot of a project involving code",
        'src': "images/example1.png",
        'comment': "Work Example"
    }
};

describe("ExampleWorkModal component", () => {
  let component = shallow(<ExampleWorkModal example={myWorkExample}
    open={false}/>);
  let openComponent = shallow(<ExampleWorkModal example={myWorkExample}
    open={true}/>);
  let anchor = component.find("a");

  it ("should contain a single anchor", () => {
    expect(anchor.length).toEqual(1);
  });

  it ("should link to project", () => {
    expect(anchor.prop('href')).toEqual(myWorkExample.href);
  });

  it ("should have modal set correctly", () => {
    // let comp = ;
    // expect(component.find(".background--skyBlue").hasClass("modal--closed")).toEqual(true);
    // expect(openComponent.find(".background--skyBlue").hasClass("modal--open")).toEqual(true);
  });
});
