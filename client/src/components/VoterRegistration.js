import React from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

const VoterRegistration = () => {
    return (
        <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Voter Registration</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                        <p>
                           We are still working on it.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VoterRegistration
