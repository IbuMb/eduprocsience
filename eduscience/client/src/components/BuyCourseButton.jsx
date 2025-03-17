import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { useCreateCheckoutSessionMutation } from '@/features/api/purchaseApi';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const BuyCourseButton = ({courseId}) => {
  const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] = useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId);
  }
  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url;
      }else{
        toast.error("Une erreur est survenue");
      }
    }
    if (isError) {
      toast.error(error?.data?.message || "Une erreur est survenue");
    }
    
  }, [data, isSuccess,isError, error]);


  return (

        <Button  disabled={isLoading} onClick={purchaseCourseHandler} className='w-full'>
          {
            isLoading ? (
              <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Chargement...</span>
              </>
            ) : "Acheter"

          }
         
          </Button>
  )
}

export default BuyCourseButton