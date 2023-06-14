import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { post } from '../../../services/fetch';
import { notifier } from '../../../utilities/stringOperations';
import Loader from '../../../components/microComponents/loader';

const DeclineInvite = () => {
  const { token } = useParams();
  const { push } = useHistory();
  const [status, setStatus] = useState(false);
  const DeclineInviteUser = async () => {
    try {
      setStatus(true);
      const datax = await post({ endpoint: 'DECLINE_ENGAGEMENT_INVITE', auth: true, param: token });
      console.log(datax);
      if (datax.status === 200) {
        notifier({
          type: 'success',
          text: 'Enganagment Invite Has been declined',
          title: 'Success'
        });
        push('/app/engagement');
      } else {
        throw new Error(datax);
      }
    } catch (e) {
      console.log(e);
      notifier({
        type: 'error',
        text: e.message,
        title: 'Error'
      });
    }
    setStatus(false);
  };

  return (
    <div className="m-t-40">
      <div className="content">
        <div className="box-shadow max-w-850">
          <div className="d-flex justify-content-between">
            <div className="login position-relative ">
              <div className="login-content p-0 m-0 ml-lg-5">
                <p className="font-title-small text-theme-black bold theme-font-bold text-theme">
                  Fast. Secure. Safe.
                </p>
                <p className="font-regular text-theme-grey">
                  Find peace, life is like a water fall, you’ve gotta flow.
                  They will try to close the door on you, just open it.
                  The ladies always say Khaled you smell good
                </p>
              </div>
            </div>
            <div className="p-5">
              <div className="text-center text-theme-black font-title-small theme-font mb-3">
                Accept Invitation
              </div>
              <div className="d-flex justify-content-between wrap">
                {/* {
                  status === 'pending'
                    ? <Loader />
                    : (
                      <FormBuilder
                        formItems={
                          registerUserProps(
                            {
                              formData,
                              handleBlur,
                              handleChange,
                              errors,
                              handleChecked
                            }
                          )
                        }
                      />
                    )
                } */}
              </div>
              <div className="row justify-content-between">
                <div className="mt-md-1 font-small">
                &nbsp;
                </div>
                <div className="p-3">

                  {
                    status
                      ? <Loader />
                      : (
                        <button className=" btn" type="button" onClick={DeclineInviteUser}>Decline</button>
                      )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeclineInvite;
