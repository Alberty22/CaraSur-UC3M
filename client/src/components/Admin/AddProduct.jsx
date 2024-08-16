import './AddProduct.css'

import { OkSection } from '../others/OkSection';
import { FailedSection } from '../others/FailedSection';
import { ImageInput } from '../Form/ImageInput';

import { usePopup } from '../../hooks/usePopups';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../config/apiRoutes';
import { sendData } from '../../utils/communications';
import { toBase64, changeFileName } from '../../utils/photo';

export function AddProduct() {
  const { register, handleSubmit, reset, formState: { errors }, setValue, control, watch } = useForm({ mode: 'onChange' })

  const { t } = useTranslation()

  const { handleOpen } = usePopup();
            
  const onSubmit = async data => {
    const product = {
      "description": data.productDescription || null,
      "size": data.productSize || null,
      "object": data.productName || null,
      "quantity": data.quantity || null,
      "category": data.productCategory || null,
      "length": data.productLength 
                ? data.productWidth ? `${data.productLength}cm x ${data.productWidth}cm` : `${data.productLength}cm` 
                : data.productWidth ? `${data.productWidth}cm` : null,
      "model": data.productBrand || null,
      "condition": data.productCondition || null,
      "photo": data.productImage
              ? {
                "base64": await toBase64(data.productImage),
                "name": data.productImage.name,
                "type": data.productImage.type,
                "size": data.productImage.size
              } 
              : null,
      "available": data.available || null
    }
    const res = await sendData(product, ROUTES.EQUIPMENT)

    if(res.code) {
      handleOpen(<OkSection message={t('adminEquipment.addProduct.ok')} />)
      reset()
    }
    else {
      handleOpen(<FailedSection message={t('adminEquipment.addProduct.failed')} />)
    }
    
   
    
  }

  
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='add-form'>
        <div>
            <label>{t('adminEquipment.addProduct.name')}:</label>
            <input 
              type="text" 
              {...register('productName', { required: true })} 
              placeholder={t('adminEquipment.addProduct.name-placeholder')} 
            />
            {errors.productName && <span>Este campo es requerido</span>}
        </div>

        <div>
            <label>{t('adminEquipment.addProduct.desc')}:</label>
            <input 
              type="text" 
              {...register('productDescription', { required: true })} 
              placeholder={t('adminEquipment.addProduct.desc-placeholder')} 
            />
            {errors.productDescription && <span>Este campo es requerido</span>}
        </div>

        <div>
            <label>{t('adminEquipment.addProduct.brand')}:</label>
            <input 
              type="text" 
              {...register('productBrand')} 
              placeholder={t('adminEquipment.addProduct.brand-placeholder')} 
            />
        </div>

        <div>
            <label>{t('adminEquipment.addProduct.state')}:</label>
            <input 
              type="text" 
              {...register('productCondition')} 
              placeholder={t('adminEquipment.addProduct.state-placeholder')} 
            />
        </div>

        <div>
            <label>{t('adminEquipment.addProduct.category')}:</label>
            <input 
              type="text" 
              {...register('productCategory')} 
              placeholder={t('adminEquipment.addProduct.category-placeholder')}
            />
        </div>

        <div className='multi-container'>
            <div>
                <label>{t('adminEquipment.addProduct.size')}:</label>
                <div className='size-container'>
                    <input 
                        type="text" 
                        {...register('productSize')} 
                        placeholder='S'
                        defaultValue=""
                    />
                    /
                    <input 
                        type="text" 
                        {...register('productSize')} 
                        placeholder='M'
                        defaultValue=""
                    />
                </div>
            </div>
            <div>
                <label>{t('adminEquipment.addProduct.measurements')}:</label>
                <div className='size-container'>
                    <input 
                        type="number" 
                        {...register('productLength')} 
                        placeholder="cm" 
                    /> /
                    <input 
                        type="number" 
                        {...register('productWidth')} 
                        placeholder="cm" 
                    />
                </div>
            </div>
        </div>

        <div className='multi-container'>
            <div className='input-container'>
                <label>{t('adminEquipment.addProduct.quantity')}:</label>
                <input 
                  type="number" 
                  {...register('quantity', { required: true })} 
                  placeholder="00" 
                />
                {errors.quantity && <span>Este campo es requerido</span>}
            </div>

            <div className='input-container'>
                <label>{t('adminEquipment.addProduct.available')}:</label>
                <input 
                  type="number" 
                  {...register('available', { required: true })} 
                  placeholder="00" 
                />
                {errors.available && <span>Este campo es requerido</span>}
            </div>
        </div>
        
        <div>
            <ImageInput inputKey="productImage" placeholder={t('adminEquipment.addProduct.photo')} control={control} setValue={setValue} watch={watch} errors={errors}/>
        </div>
        <div>
          <button type="submit">{t('adminEquipment.addProduct.add')}</button>
        </div>
        
    </form>
  );
}
