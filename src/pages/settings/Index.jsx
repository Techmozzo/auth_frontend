/* eslint-disable max-len */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { CgMenuMotion } from 'react-icons/cg';
import CollapsedBreadcrumbs from '../../layouts/Breadcrumb';
import CompanyProfile from './CompanyProfile';
import RolesPremission from './RolesPremission';

const Index = () => {
  const [accordionTab, setAccordionTab] = useState(1);
  const [user, setUser] = useState({});
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [current, setCurrent] = React.useState('My profile');

  const displayPages = (tab) => {
    switch (tab) {
    case 2:
      return <RolesPremission setCurrent={setCurrent} />;
      // case 3:
      //   return <WithdrawalDetails setCurrent={setCurrent} />;
      // case 4:
      //   return <Transactions setCurrent={setCurrent} />;
      // case 5:

    //   return <Notifications setCurrent={setCurrent} />;
    default:
      return <CompanyProfile setCurrent={setCurrent} />;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="container">
      <h1>Settings</h1>
      <div className="content">

        <div className="w-100 m-t-40">
          {/* <div className="login-form-container p-20"> */}
          <div className="d-flex justify-content-between">
            <h3 className="bold text-dark">Overview</h3>
            {/* <Button className="float-right d-md-none btn-plain text-wema" type="button" onClick={() => setShow(!show)}>
              <CgMenuMotion />
            </Button> */}
          </div>
          <div className="d-md-flex py-2 border-1 d-none d-lg-flex d-xl-flex">
            <div className={`p-md-2 accordion-div-2  ${accordionTab === 1 && 'is-focus'}`}>
              <button
                type="button"
                className={` no-border bg-transparent  ${accordionTab === 1 ? ' text-wema' : 'text-muted'}`}
                onClick={() => setAccordionTab(1)}
              >
                Company settings
              </button>
            </div>
            <div className={`p-md-2 accordion-div-2  ${accordionTab === 2 && 'is-focus'}`}>
              <button
                type="button"
                className={` no-border bg-transparent  ${accordionTab === 2 ? ' text-wema' : 'text-muted'}`}
                onClick={() => setAccordionTab(2)}
              >
                Roles And Permissions
              </button>
            </div>
          </div>
          <div className={show ? 'py-2 border-1' : 'd-none'}>
            {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
            <div
              onClick={() => setShow(false)}
              role="button"
              onKeyUp={() => show}
              className={`p-md-2 accordion-div-2   ${accordionTab === 1 && 'is-focus'}`}
            >
              <button
                type="button"
                className={` no-border bg-transparent  ${accordionTab === 1 ? ' text-wema' : 'text-muted'}`}
                onClick={() => setAccordionTab(1)}
              >
                Company settings
              </button>
            </div>
            {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
            <div
              onClick={() => setShow(false)}
              role="button"
              onKeyUp={() => show}
              className={`p-md-2 accordion-div-2   ${accordionTab === 2 && 'is-focus'}`}
            >
              <button
                type="button"
                className={` no-border bg-transparent  ${accordionTab === 2 ? ' text-wema' : 'text-muted'}`}
                onClick={() => setAccordionTab(2)}
              >
                Roles And Permissions
              </button>
            </div>
          </div>
          <div>
            <div>
              {displayPages(accordionTab)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
