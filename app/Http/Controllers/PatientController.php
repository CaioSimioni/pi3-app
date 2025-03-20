<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index() {
        $patients = Patient::orderBy('created_at', 'desc')->get();

        return Inertia::render('patients/index', [
            'patients' => $patients,
        ]);
    }

    public function create() {
        return Inertia::render('Patients/Create');
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'cpf' => 'required|string|unique:patients,cpf',
            'birth_date' => 'required|date',
            'phone' => 'nullable|string|max:15',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string|max:255',
            'insurance' => 'nullable|in:Nenhum,São Francisco,Unimed',
        ]);

        Patient::create(array_merge($request->all(), ['is_active' => true]));

        return redirect()->route('patients.index')->with('success', 'Paciente cadastrado com sucesso!');
    }

    public function show(Patient $patient) {
        return Inertia::render('Patients/Show', [
            'patient' => $patient,
        ]);
    }

    public function edit(Patient $patient) {
        return Inertia::render('Patients/Edit', [
            'patient' => $patient,
        ]);
    }

    public function update(Request $request, Patient $patient) {
        $request->validate([
            'name' => 'required|string|max:255',
            'cpf' => 'required|string|unique:patients,cpf,' . $patient->id,
            'birth_date' => 'required|date',
            'phone' => 'nullable|string|max:15',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string|max:255',
            'insurance' => 'nullable|in:Nenhum,São Francisco,Unimed',
        ]);

        $patient->update($request->all());

        return redirect()->route('patients.index')->with('success', 'Paciente atualizado com sucesso!');
    }

    public function destroy(Patient $patient) {
        $patient->delete();

        return redirect()->route('patients.index')->with('success', 'Paciente excluído com sucesso!');
    }
}
