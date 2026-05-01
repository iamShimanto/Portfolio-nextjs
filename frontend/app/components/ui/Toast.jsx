'use client';

import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';

const toastConfig = {
    success: {
        icon: FiCheckCircle,
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        titleColor: 'text-green-900',
        descColor: 'text-green-700',
        iconColor: 'text-green-600',
        duration: 4000,
    },
    error: {
        icon: FiAlertCircle,
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        titleColor: 'text-red-900',
        descColor: 'text-red-700',
        iconColor: 'text-red-600',
        duration: 5000,
    },
    info: {
        icon: FiInfo,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        titleColor: 'text-blue-900',
        descColor: 'text-blue-700',
        iconColor: 'text-blue-600',
        duration: 4000,
    },
    warning: {
        icon: FiAlertTriangle,
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        titleColor: 'text-amber-900',
        descColor: 'text-amber-700',
        iconColor: 'text-amber-600',
        duration: 4000,
    },
};

const ToastContent = ({ type, title, description, icon: CustomIcon }) => {
    const config = toastConfig[type];
    const IconComponent = CustomIcon || config.icon;

    return (
        <div
            className={`flex items-start gap-3 rounded-lg border ${config.bgColor} ${config.borderColor} px-4 py-3 shadow-lg`}
        >
            <IconComponent className={`h-5 w-5 flex-shrink-0 ${config.iconColor} mt-0.5`} />
            <div className="flex-1">
                {title && (
                    <p className={`text-sm font-semibold ${config.titleColor}`}>
                        {title}
                    </p>
                )}
                {description && (
                    <p className={`text-sm ${config.descColor} ${title ? 'mt-1' : ''}`}>
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

const PromiseToastContent = ({ title, description }) => {
    return (
        <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 shadow-lg">
            <FiLoader className="h-5 w-5 flex-shrink-0 animate-spin text-blue-600 mt-0.5" />
            <div className="flex-1">
                {title && (
                    <p className="text-sm font-semibold text-blue-900">
                        {title}
                    </p>
                )}
                {description && (
                    <p className={`text-sm text-blue-700 ${title ? 'mt-1' : ''}`}>
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

export const showToast = {
    success: (title = 'সফল', description = '', options = {}) => {
        const config = toastConfig.success;
        toast.custom(
            (t) => (
                <ToastContent
                    type="success"
                    title={title}
                    description={description}
                />
            ),
            {
                duration: config.duration,
                ...options,
            }
        );
    },

    error: (title = 'ত্রুটি', description = '', options = {}) => {
        const config = toastConfig.error;
        toast.custom(
            (t) => (
                <ToastContent
                    type="error"
                    title={title}
                    description={description}
                />
            ),
            {
                duration: config.duration,
                ...options,
            }
        );
    },

    info: (title = 'তথ্য', description = '', options = {}) => {
        const config = toastConfig.info;
        toast.custom(
            (t) => (
                <ToastContent
                    type="info"
                    title={title}
                    description={description}
                />
            ),
            {
                duration: config.duration,
                ...options,
            }
        );
    },

    warning: (title = 'সতর্কতা', description = '', options = {}) => {
        const config = toastConfig.warning;
        toast.custom(
            (t) => (
                <ToastContent
                    type="warning"
                    title={title}
                    description={description}
                />
            ),
            {
                duration: config.duration,
                ...options,
            }
        );
    },

    promise: (
        promise,
        {
            loading = 'লোডিং হচ্ছে...',
            success = 'সফল হয়েছে!',
            error = 'ব্যর্থ হয়েছে',
        } = {},
        options = {}
    ) => {
        const toastId = toast.custom(
            () => (
                <PromiseToastContent
                    title={loading}
                    description=""
                />
            ),
            {
                duration: Infinity,
                ...options,
            }
        );

        promise
            .then((result) => {
                toast.dismiss(toastId);
                const successMsg = typeof success === 'function' ? success(result) : success;
                showToast.success(
                    successMsg.title || 'সফল',
                    successMsg.description || '',
                    options
                );
                return result;
            })
            .catch((err) => {
                toast.dismiss(toastId);
                const errorMsg = typeof error === 'function' ? error(err) : error;
                showToast.error(
                    errorMsg.title || 'ত্রুটি',
                    errorMsg.description || err?.message || '',
                    options
                );
            });

        return toastId;
    },

    dismiss: (toastId) => {
        if (toastId) {
            toast.dismiss(toastId);
        } else {
            toast.dismiss();
        }
    },
};

export default ToastContent;
