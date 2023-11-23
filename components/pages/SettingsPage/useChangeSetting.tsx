import { queryClient } from '@/provider/QueryProvider';
import { UserContext } from '@/provider/UserInfoProvider';
import { UPDATE_USER } from '@/react-query/user/user';
import { useContext } from 'react';
import { useMutation } from 'react-query';

const useChangeSetting = () => {

  const userInfo = useContext(UserContext);
  
  const changeSetting = useMutation(UPDATE_USER, {
    onSuccess: () => queryClient.refetchQueries(["userInfo"]),
  });
  return {userInfo, changeSetting}
}

export default useChangeSetting